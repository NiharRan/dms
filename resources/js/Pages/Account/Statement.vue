<template>
  <layout name="transaction">
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
                      <th colspan="1">
                        <input
                          type="text"
                          @keyup="searchData"
                          v-model="search.query"
                          class="form-control"
                          :placeholder="__('Search')"
                        />
                      </th>
                      <th colspan="4" class="text-center">
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
                          class="btn btn-default"
                          type="button"
                          @click="print"
                        >
                          <i class="feather icon-printer mr-2"></i>
                          {{ __("Print") }}
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th>{{ __("Date & Time") }}</th>
                      <th>{{ __("Invoice") }}</th>
                      <th>{{ __("Transaction Type") }}</th>
                      <th>{{ __("Transaction Media") }}</th>
                      <th>{{ __("Description") }}</th>
                      <th class="text-right">{{ __("Amount") }}</th>
                      <th class="text-center">{{ __("Action") }}</th>
                    </tr>
                  </thead>
                  <tbody v-if="transactions && transactions.data.length > 0">
                    <tr
                      v-for="(transaction, index) in transactions.data"
                      :key="transaction.id"
                    >
                      <th style="width: 50px">{{ index + 1 }}</th>
                      <td>
                        {{
                          transaction.created_at | moment("DD/MM/YYYY hh:mm A")
                        }}
                      </td>
                      <th>{{ transaction.transactionable.invoice }}</th>
                      <th>{{ transaction.transaction_type.name }}</th>
                      <th>{{ transaction.media.name }}</th>
                      <th class="text-right">{{ transaction.description }}</th>
                      <th class="text-right">{{ transaction.amount }}</th>
                      <td class="text-center">
                        <a
                          :href="route('accounts.ledgers', transaction.id)"
                          class="text-primary"
                          role="button"
                          ><i class="feather icon-eye"></i
                        ></a>
                      </td>
                    </tr>

                    <tr>
                      <td colspan="6" class="text-right">{{ __("Total") }}</td>
                      <th class="text-right">
                        {{ totalAmount(transactions.data) }}
                      </th>
                      <th></th>
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
            <div class="col-md-6 col-12">
              <label>{{ __("Transaction Type") }}</label>
              <multi-select
                v-model="search.transaction_type"
                :options="transaction_types"
                label="name"
                track-by="name"
                :placeholder="__('Select Transaction Type')"
              ></multi-select>
            </div>
            <div class="col-md-6 col-12">
              <label>{{ __("Transaction Media") }}</label>
              <multi-select
                v-model="search.media"
                :options="medias"
                label="name"
                track-by="name"
                :placeholder="__('Select Transaction Media')"
              ></multi-select>
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

export default {
  name: "AccountStatement",
  components: { Model, Layout },
  props: {
    transactions: Object,
    transaction_types: Array,
    medias: Array,
    success: String,
  },
  data: function () {
    return {
      search: {
        per_page: 10,
        query: "",
        invoice: "",
        transaction_type: null,
        media: null,
        dateRange: {},
      },
    };
  },
  methods: {
    totalAmount: function (data) {
      let paidPrice = data.reduce((paid, transaction) => {
        let p = transaction.amount == "" ? 0 : transaction.amount;
        return paid + parseFloat(p);
      }, 0);
      return parseFloat(paidPrice).toFixed(2);
    },
    searchData: function () {
      $("#default").modal("hide");
      let transaction_type =
        this.search.transaction_type == null
          ? ""
          : this.search.transaction_type.id;
      let media = this.search.media == null ? "" : this.search.media.id;
      let start_date = this.$options.filters.moment(
        this.search.dateRange.startDate,
        "YYYY-MM-DD"
      );
      let end_date = this.$options.filters.moment(
        this.search.dateRange.endDate,
        "YYYY-MM-DD"
      );
      this.$inertia.replace(this.route("accounts.statements"), {
        method: "get",
        data: {
          search: this.search.query,
          per_page: this.search.per_page,
          invoice: this.search.invoice,
          transaction_type: transaction_type,
          media: media,
          start_date: start_date,
          end_date: end_date,
        },
        preserveState: true,
        preserveScroll: true,
      });
    },
    print: function () {
      let transaction_type = this.search.transaction_type == null ? "" : this.search.transaction_type.id;
      let media = this.search.media == null ? "" : this.search.media.id;
      let query = `/accounts/statements/print?search=${this.search.query}&&invoice=${this.search.invoice}&&transaction_type=${transaction_type}&&media=${media}`;
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

@media print {
  td,
  th {
    font-size: 14px !important;
  }
  .bb {
    border-bottom: 1px solid #0b0b0b !important;
  }
  .bt {
    border-top: 1px solid #0b0b0b !important;
  }
  .controller {
    display: none;
  }
}
</style>
