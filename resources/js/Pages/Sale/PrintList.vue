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

          <div class="print-header" v-if="!hasHeader">
            <img :src="company.current_logo" :alt="company.name" />
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
            <table class="table table-bordered font-medium-3">
              <thead>
                <tr>
                  <th scope="col">{{ __("S.N.") }}</th>
                  <th>{{ __("Date") }}</th>
                  <th>{{ __("Creator") }}</th>
                  <th>{{ __("Invoice") }}</th>
                  <th>{{ __("Client") }}</th>
                  <th class="text-right">{{ __("Commission") }}</th>
                  <th class="text-right">{{ __("Total Price") }}</th>
                  <th class="text-right">{{ __("Paid") }}</th>
                  <th class="text-right">{{ __("Due") }}</th>
                </tr>
              </thead>
              <tbody v-if="sales.length > 0">
                <tr v-for="(sale, index) in sales" :key="sale.id">
                  <th style="width: 80px">{{ index + 1 }}</th>
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
                </tr>
              </tbody>
              <tfoot class="bt">
                <tr>
                  <td colspan="5" class="text-right">{{ __("Total") }}</td>
                  <th class="text-right">
                    {{ totalCommission(sales) }}
                  </th>
                  <th class="text-right">{{ total(sales) }}</th>
                  <th class="text-right">{{ totalPaid(sales) }}</th>
                  <th class="text-right">{{ totalDue(sales) }}</th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="print-footer" v-if="!hasHeader">
            <img src="/images/footer.png" :alt="company.name" />
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
@media print {
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
