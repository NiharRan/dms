<template>
  <div class="invoice-card card">
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
          <div class="controller position-absolute width-300">
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
          <div class="invoice-body" :class="[hasHeader ? 'mt-0' : 'mt-200']">
            <table class="table font-medium-3">
              <thead>
                <tr>
                  <th scope="col">{{ __("S.N.") }}</th>
                  <th>{{ __("Date") }}</th>
                  <th>{{ __("Creator") }}</th>
                  <th>{{ __("Invoice") }}</th>
                  <th class="text-right">{{ __("Total Price") }}</th>
                  <th class="text-right">{{ __("Paid") }}</th>
                  <th class="text-right">{{ __("Commission") }}</th>
                </tr>
              </thead>
              <tbody v-if="sales.length > 0">
                <tr v-for="(sale, index) in sales" :key="sale.id">
                  <th style="width: 50px">{{ index + 1 }}</th>
                  <td>{{ sale.sale_date | moment("DD/MM/YYYY") }}</td>
                  <th>{{ sale.creator.name }}</th>
                  <th>{{ sale.invoice }}</th>
                  <th class="text-right">{{ sale.total_price }}</th>
                  <th class="text-right">{{ sale.total_paid }}</th>
                  <th class="text-right">{{ sale.commission }}</th>
                </tr>

                <tr>
                  <td colspan="4" class="text-right">{{ __("Total") }}</td>
                  <th class="text-right">{{ total(sales) }}</th>
                  <th class="text-right">{{ totalPaid(sales) }}</th>
                  <th class="text-right">
                    {{ totalCommission(sales) }}
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
</template>

<script>
export default {
  name: "PrintList",
  props: {
    sales: Array,
    company: Object,
  },
  data() {
    return {
      hasHeader: false,
    };
  },
  methods: {
    total: function (data) {
      let totalPrice = data.reduce(
        (total, sale) => total + parseFloat(sale.total_price),
        0
      );
      return parseFloat(totalPrice).toFixed(2);
    },
    totalPaid: function (data) {
      let paidPrice = data.reduce((paid, sale) => {
        let p = sale.total_paid == "" ? 0 : sale.total_paid;
        return paid + parseFloat(p);
      }, 0);
      return parseFloat(paidPrice).toFixed(2);
    },
    totalCommission: function (data) {
      let commissionPrice = data.reduce((c, sale) => {
        let com = sale.commission == "" ? 0 : sale.commission;
        return c + parseFloat(com);
      }, 0);
      return parseFloat(commissionPrice).toFixed(2);
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
.controller {
  right: 10px;
  top: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);
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
  .table {
    border-bottom: 1px solid #0b0b0b !important;
  }
  .controller {
    display: none;
  }
}
</style>
