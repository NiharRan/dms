<template>
  <layout name="Sale">
    <!-- product list start -->
    <section class="users-list-wrapper">
      <!-- product section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive">
                <table
                  id="data-table"
                  class="table table-bordered display nowrap mb-0"
                >
                  <thead>
                    <tr>
                      <th colspan="2">
                        <select
                          v-model="search.per_page"
                          @change="searchData"
                          class="form-control"
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="25">50</option>
                          <option value="25">100</option>
                        </select>
                      </th>
                      <th colspan="2">
                        <input
                          type="text"
                          class="form-control"
                          @change="searchData"
                          v-model="search.invoice"
                          :placeholder="__('Invoice')"
                        />
                      </th>
                      <th colspan="2">
                        <input
                          type="text"
                          @keyup="searchData"
                          v-model="search.query"
                          class="form-control"
                          :placeholder="__('Search')"
                        />
                      </th>
                      <th colspan="3" class="text-center">
                        <button
                          class="btn btn-default"
                          data-toggle="modal"
                          data-target="#default"
                          type="button"
                        >
                          <i class="feather icon-filter mr-2"></i>
                          {{ __("Filter") }}
                        </button>
                        <button
                          :disabled="
                            sales && sales.data.length > 0 ? false : true
                          "
                          class="btn btn-default"
                          type="button"
                          @click="print"
                        >
                          <i class="feather icon-printer mr-2"></i>
                          {{ __("Print") }}
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>
                <table
                  v-if="sales && sales.data.length > 0"
                  id="data-table"
                  class="table table-bordered display nowrap mb-0"
                  style="width: 110%"
                >
                  <thead>
                    <tr v-if="sales && sales.data.length > 0">
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th>{{ __("Date") }}</th>
                      <th>{{ __("Creator") }}</th>
                      <th>{{ __("Invoice") }}</th>
                      <th>{{ __("Client") }}</th>
                      <th class="text-right">{{ __("Commission") }}</th>
                      <th class="text-right">{{ __("Final Amount") }}</th>
                      <th class="text-right">{{ __("Paid") }}</th>
                      <th class="text-right">{{ __("Due") }}</th>
                      <th class="text-center">{{ __("Action") }}</th>
                    </tr>
                  </thead>
                  <tbody v-if="sales && sales.data.length > 0">
                    <tr v-for="(sale, index) in sales.data" :key="sale.id">
                      <th style="width: 50px">{{ index + 1 }}</th>
                      <td>{{ sale.sale_date | moment("DD/MM/YYYY") }}</td>
                      <th>{{ sale.creator.name }}</th>
                      <th>{{ sale.invoice }}</th>
                      <th>{{ sale.client.name }}</th>
                      <th class="text-right">
                        {{ parseFloat(sale.commission).toFixed(3) }}
                      </th>
                      <th class="text-right">
                        {{ parseFloat(sale.total_price).toFixed(3) }}
                      </th>
                      <th class="text-right">
                        {{ parseFloat(sale.total_paid).toFixed(3) }}
                      </th>
                      <th class="text-right">
                        {{ parseFloat(sale.total_due).toFixed(3) }}
                      </th>
                      <td class="text-center">
                        <a
                          :href="route('sales.edit', sale.id)"
                          class="text-info"
                          role="button"
                          ><i class="feather icon-edit"></i
                        ></a>
                        <a
                          :href="route('sales.invoices.show', sale.invoice)"
                          class="text-primary"
                          role="button"
                          ><i class="feather icon-eye"></i
                        ></a>
                      </td>
                    </tr>

                    <tr>
                      <td colspan="5" class="text-right">{{ __("Total") }}</td>
                      <th class="text-right">
                        {{ totalCommission(sales.data) }}
                      </th>
                      <th class="text-right">{{ total(sales.data) }}</th>
                      <th class="text-right">{{ totalPaid(sales.data) }}</th>
                      <th class="text-right">{{ totalDue(sales.data) }}</th>

                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-1">
                <pagination v-if="sales" :links="sales.meta.links"></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <model :size="'modal-lg'">
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">
            {{ __("Advanced Search") }}
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </template>
        <div class="modal-body">
          <div class="form-group" v-if="$page.auth.is_admin">
            <label>{{ __("Date Range") }}</label>
            <date-range-picker
              ref="picker"
              :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY' }"
              :showDropdowns="true"
              v-model="search.dateRange"
            >
              <template v-slot:input="picker">
                {{ picker.startDate | moment("DD-MM-YYYY") }} -
                {{ picker.endDate | moment("DD-MM-YYYY") }}
              </template>
            </date-range-picker>
          </div>
          <div class="form-group row mb-0">
            <div class="col-md-6 col-12">
              <label>{{ __("Client") }}</label>
              <multi-select
                v-model="search.client"
                :options="clients"
                label="name"
                track-by="name"
                :placeholder="__('Select Client')"
              ></multi-select>
            </div>
            <div class="col-md-6 col-12">
              <label>{{ __("Payment Status") }}</label>
              <select v-model="search.status" class="form-control">
                <option value="">{{ __("Payment Status") }}</option>
                <option value="1">{{ __("Paid") }}</option>
                <option value="0">{{ __("Due") }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="searchData" class="btn btn-success">
            {{ __("Search") }}
          </button>
          <button type="button" class="btn btn-secendary" data-dismiss="modal">
            {{ __("Cancel") }}
          </button>
        </div>
      </model>
      <!-- Ag Grid users list section end -->
    </section>
    <!-- product type list ends -->
  </layout>
</template>

<script>
import Layout from "../../Shared/Layout";
import Model from "../../Components/Model";
import Pagination from "../../Shared/Pagination";

export default {
  name: "Sale",
  components: { Model, Layout, Pagination },
  props: {
    sales: Object,
    clients: Array,
    success: String,
  },
  data: function () {
    return {
      search: {
        per_page: 10,
        query: "",
        invoice: "",
        status: "",
        client: null,
        dateRange: {},
      },
    };
  },
  methods: {
    total: function (data) {
      let totalPrice = data.reduce(
        (total, sale) => total + parseFloat(sale.total_price),
        0
      );
      return parseFloat(totalPrice).toFixed(3);
    },
    totalPaid: function (data) {
      let paidPrice = data.reduce((paid, sale) => {
        let p = sale.total_paid == "" ? 0 : sale.total_paid;
        return paid + parseFloat(p);
      }, 0);
      return parseFloat(paidPrice).toFixed(3);
    },
    totalDue: function (data) {
      let duePrice = data.reduce((due, sale) => {
        let p = sale.total_due == "" ? 0 : sale.total_due;
        return due + parseFloat(p);
      }, 0);
      return parseFloat(duePrice).toFixed(3);
    },
    totalCommission: function (data) {
      let commissionPrice = data.reduce((c, sale) => {
        let com = sale.commission == "" ? 0 : sale.commission;
        return c + parseFloat(com);
      }, 0);
      return parseFloat(commissionPrice).toFixed(3);
    },
    searchData: function () {
      $("#default").modal("hide");
      let client = this.search.client == null ? "" : this.search.client.id;
      let start_date = this.$options.filters.moment(
        this.search.dateRange.startDate,
        "YYYY-MM-DD"
      );
      let end_date = this.$options.filters.moment(
        this.search.dateRange.endDate,
        "YYYY-MM-DD"
      );
      this.$inertia.replace(this.route("sales.index"), {
        method: "get",
        data: {
          search: this.search.query,
          per_page: this.search.per_page,
          invoice: this.search.invoice,
          status: this.search.status,
          client: client,
          start_date: start_date,
          end_date: end_date,
        },
        preserveState: true,
        preserveScroll: true,
      });
    },
    print: function () {
      let client = this.search.client == null ? "" : this.search.client.id;
      let query = `sales/print?search=${this.search.query}&&invoice=${this.search.invoice}&&status=${this.search.status}&&client=${client}`;
      if (this.search.dateRange.startDate) {
        let start_date = this.$options.filters.moment(
          this.search.dateRange.startDate,
          "YYYY-MM-DD"
        );
        let end_date = this.$options.filters.moment(
          this.search.dateRange.endDate,
          "YYYY-MM-DD"
        );
        query = `${query}&&start_date=${start_date}&&end_date=${end_date}`;
      }
      window.open(query, "_blank");
    },
  },
  created() {
    // this.searchData();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="vue2-daterange-picker/dist/vue2-daterange-picker.css"></style>
<style>
.btn-default {
  border: 1px solid #ccc;
  padding: 10px;
}
.vue-daterange-picker[data-v-4f8eb193] {
  min-width: 100% !important;
}
</style>
