<template>
  <layout name="DriverInvoice">
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

              <div>
                <table
                  id="data-table"
                  class="table table-responsive table-bordered mb-0"
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
                          <option value="50">50</option>
                          <option value="100">100</option>
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
                      <th class="text-center">
                        <button
                          class="btn btn-default"
                          data-toggle="modal"
                          data-target="#default"
                          type="button"
                        >
                          <i class="feather icon-filter mr-2"></i>
                          {{ __("Filter") }}
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table-responsive" v-if="driver_invoices && driver_invoices.data.length > 0">
                <table
                  id="data-table"
                  class="table table-responsive table-bordered mb-0"
                  style="width: 130%"
                >
                  <thead>
                    <tr
                      v-if="driver_invoices && driver_invoices.data.length > 0"
                    >
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th style="width: 10%">{{ __("Client") }}</th>
                      <th>{{ __("Driver") }}</th>
                      <th class="text-center">{{ __("Invoice") }}</th>
                      <th>{{ __("Measurement Type") }}</th>
                      <th>{{ __("Created At") }}</th>
                      <th class="text-center">{{ __("Status") }}</th>
                      <th class="text-center">{{ __("Quantity") }}</th>
                      <th class="text-right">{{ __("Track Rent") }}</th>
                      <th class="text-right">{{ __("Others") }}</th>
                      <th>{{ __("Total") }}</th>
                      <th>{{ __("Borrow") }}</th>
                      <th>{{ __("Final") }}</th>
                      <th class="text-center">{{ __("Action") }}</th>
                    </tr>
                  </thead>
                  <tbody
                    class="font-small-3"
                    v-if="driver_invoices && driver_invoices.data.length > 0"
                  >
                    <tr>
                      <td colspan="10"></td>
                      <th class="text-right">
                        {{ total(driver_invoices.data) }}
                      </th>
                      <th class="text-right">
                        {{ totalBorrow(driver_invoices.data) }}
                      </th>
                      <th class="text-right">
                        {{ totalFinal(driver_invoices.data) }}
                      </th>
                    </tr>
                    <tr
                      v-for="(driver_invoice, index) in driver_invoices.data"
                      :key="driver_invoice.id"
                    >
                      <th>{{ index + 1 }}</th>
                      <td>
                        {{ driver_invoice.client.name }}
                      </td>
                      <td>
                        {{ driver_invoice.driver_name }}
                      </td>
                      <th class="text-center">
                        {{ driver_invoice.invoice }}
                      </th>
                      <td>
                        <p class="mb-0">
                          <strong>{{
                            driver_invoice.measurement_type.name
                          }}</strong>
                        </p>
                        <p class="mb-0 text-sm">
                          {{ __("Height") }}{{ __(":") }}
                          {{ driver_invoice.container_height }}
                        </p>
                        <p class="mb-0 text-sm">
                          {{ __("Length") }}{{ __(":") }}
                          {{ driver_invoice.container_length }}
                        </p>
                        <p class="mb-0 text-sm">
                          {{ __("Breadth") }}{{ __(":") }}
                          {{ driver_invoice.container_breadth }}
                        </p>
                      </td>
                      <td>
                        {{ driver_invoice.created_at | moment("DD/MM/YYYY") }}
                      </td>
                      <td
                        v-html="
                          $options.filters.payment_status(driver_invoice.status)
                        "
                      ></td>
                      <td class="text-center">
                        {{ driver_invoice.quantity }}
                      </td>
                      <td class="text-right">
                        {{ driver_invoice.track_rent }}
                      </td>
                      <td class="text-right">{{ driver_invoice.others }}</td>
                      <td class="text-right">{{ driver_invoice.total }}</td>
                      <td class="text-right">{{ driver_invoice.borrow }}</td>
                      <td class="text-right">{{ driver_invoice.final }}</td>
                      <td class="text-center">
                        <inertia-link
                          :href="
                            route(
                              'drivers.invoices.show',
                              driver_invoice.invoice
                            )
                          "
                          class="text-primary"
                          ><i class="feather icon-eye"></i
                        ></inertia-link>
                        <inertia-link
                          :href="
                            route('drivers.invoices.edit', driver_invoice.id)
                          "
                          class="text-info"
                          role="button"
                          ><i class="feather icon-edit"></i
                        ></inertia-link>
                        <inertia-link href="" class="text-warning" role="button"
                          ><i class="feather icon-trash"></i
                        ></inertia-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
          <div class="form-group">
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
            <div class="col-md-4 col-12">
              <label>{{ __("Product") }}</label>
              <multi-select
                v-model="search.product"
                :options="products"
                label="name"
                track-by="name"
                :placeholder="__('Select Product')"
              ></multi-select>
            </div>
            <div class="col-md-4 col-12">
              <label>{{ __("Client") }}</label>
              <multi-select
                v-model="search.client"
                :options="clients"
                label="name"
                track-by="name"
                :placeholder="__('Select Client')"
              ></multi-select>
            </div>
            <div class="col-md-4 col-12">
              <label>{{ __("Payment Status") }}</label>
              <select v-model="search.status" class="form-control">
                <option value="">{{ __("Payment Status") }}</option>
                <option value="1">{{ __("Borrow") }}</option>
                <option value="0">{{ __("Final") }}</option>
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
import Layout from "../../../Shared/Layout";
import Model from "../../../Components/Model";

export default {
  name: "DriverInvoice",
  components: { Model, Layout },
  props: {
    driver_invoices: Object,
    clients: Array,
    products: Array,
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
        product: null,
        dateRange: {},
      },
    };
  },
  methods: {
    total: function (data) {
      let totalPrice = data.reduce(
        (total, invoice) => total + parseFloat(invoice.total),
        0
      );
      return parseFloat(totalPrice).toFixed(2);
    },
    totalBorrow: function (data) {
      let borrowPrice = data.reduce((borrow, invoice) => {
        let p = invoice.borrow == "" ? 0 : invoice.borrow;
        return borrow + parseFloat(p);
      }, 0);
      return parseFloat(borrowPrice).toFixed(2);
    },
    totalFinal: function (data) {
      let finalPrice = data.reduce((final, invoice) => {
        let d = invoice.final == "" ? 0 : invoice.final;
        return final + parseFloat(d);
      }, 0);
      return parseFloat(finalPrice).toFixed(2);
    },
    searchData: function () {
      $("#default").modal("hide");
      let client = this.search.client == null ? "" : this.search.client.id;
      let product = this.search.product == null ? "" : this.search.product.id;
      let start_date = this.$options.filters.moment(
        this.search.dateRange.startDate,
        "YYYY-MM-DD"
      );
      let end_date = this.$options.filters.moment(
        this.search.dateRange.endDate,
        "YYYY-MM-DD"
      );
      this.$inertia.replace(this.route("drivers.invoices.index"), {
        method: "get",
        data: {
          search: this.search.query,
          per_page: this.search.per_page,
          invoice: this.search.invoice,
          status: this.search.status,
          client: client,
          product: product,
          start_date: start_date,
          end_date: end_date,
        },
        preserveState: true,
        preserveScroll: true,
      });
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
