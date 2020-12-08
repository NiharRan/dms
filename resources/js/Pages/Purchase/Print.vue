<template>
  <div class="invoice-card card" :class="[!hasHeader ? 'page-gap' : '']">
    <div class="card-content">
      <div class="card-body">
        <div class="invoice">
          <div
            class="invoice-header text-center mb-2 position-relative"
            v-if="hasHeader"
          >
            <div class="logo position-absolute width-200">
              <img
                :src="company.current_logo"
                class="width-95-per"
                :alt="company.name"
              />
            </div>
            <h1 style="font-weight: bolder" class="mb-0">
              {{ company.name }}
            </h1>
            <h5>{{ company.description }}</h5>
            <p class="my-1">
              <span class="owner">{{ __("Pro:-") }} {{ company.owner }}</span>
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Head Office") }}: </span
              >{{ company.head_office }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Dipu Office") }}: </span
              >{{ company.dipu_office }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Address") }}: </span
              >{{ company.address }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Sales Center") }}: </span
              >{{ company.sales_center }}
            </p>
            <p class="mb-0">
              <span class="text-left">
                <span class="text-bold-700"> {{ __("Phone:") }}</span>
                {{ translate(company.active_phones.toString()) }}
              </span>
              <span class="text-right">
                <span class="text-bold-700"> {{ __("Email:") }}</span>
                {{ company.email }}
              </span>
            </p>
          </div>
          <div class="controller width-300">
            <label
              ><input type="checkbox" v-model="hasHeader" />
              {{ __("Attach company information") }}</label
            >
            <button
              type="button"
              @click="printPage"
              class="btn btn-primary btn-sm float-right"
            >
              {{ __("Print") }}
            </button>
          </div>
          <div class="invoice-body">
            <div class="text-center">
              <h2 class="mb-0 stock-name">{{ stock_details.stock.name }}</h2>
              <p class="mb-0">{{ stock_details.stock.address }}</p>
              <p style="font-size: 3px">{{ stock_details.product.name }}</p>
            </div>
            <table class="table table-bordered font-medium-3">
              <thead>
                <tr>
                  <th scope="col">{{ __("S.N.") }}</th>
                  <th>{{ __("Date") }}</th>
                  <th class="text-center">{{ __("Ship") }}</th>
                  <th class="text-center">{{ __("Company") }}</th>
                  <th class="text-right">{{ __("Quantity") }}</th>
                </tr>
              </thead>
              <tbody v-if="stock_details_histories.length > 0">
                <tr
                  v-for="(history, index) in stock_details_histories"
                  :key="history.id"
                >
                  <th style="width: 80px">{{ index + 1 }}</th>
                  <td>{{ history.history_date | moment("DD/MM/YYYY") }}</td>
                  <th class="text-center">{{ history.shop }}</th>
                  <th class="text-center">{{ history.comapny }}</th>
                  <th class="text-right">{{ history.quantity }}</th>
                </tr>
              </tbody>
              <tfoot class="bt">
                <tr>
                  <td colspan="4" class="text-right">{{ __("Total") }}</td>

                  <th class="text-right">
                    {{ total(stock_details_histories) }}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintList",
  props: {
    stock_details_histories: Array,
    stock_details: Object,
    company: Object,
  },
  data() {
    return {
      hasHeader: false,
    };
  },
  methods: {
    total: function (data) {
      let totalQuantity = data.reduce(
        (total, history) => total + parseFloat(history.quantity),
        0
      );
      return parseFloat(totalQuantity).toFixed(2);
    },
    printPage: function () {
      window.print();
    },
  },
  created() {},
};
</script>

<style>
.mt-200 {
  margin-top: 200px;
}
.mb-200 {
  margin-top: 200px;
}

body {
  -webkit-print-color-adjust: exact !important;
}
* {
  font-family: "SolaimanLipi", sans-serif;
  font-size: 20px !important;
}
.owner {
  background-color: #000;
  color: #fff;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 18px;
}
.signature {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
@media print {
  .stock-name {
    font-size: 30px !important;
  }
  .table th,
  .table td {
    padding: 0.5rem !important;
  }
  .table-bordered {
    border: 1px solid #333 !important;
  }
  td,
  th {
    font-size: 14px !important;
  }
  .bt {
    border-top: 1px solid #0b0b0b !important;
  }
  .controller {
    display: none;
  }
}
</style>
