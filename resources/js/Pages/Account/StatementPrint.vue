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
            <table id="data-table" class="table table-bordered font-medium-3">
              <thead>
                <tr>
                  <th scope="col">{{ __("S.N.") }}</th>
                  <th>{{ __("Date & Time") }}</th>
                  <th>{{ __("Invoice") }}</th>
                  <th>{{ __("Transaction Type") }}</th>
                  <th>{{ __("Transaction Media") }}</th>
                  <th>{{ __("Description") }}</th>
                  <th class="text-right">{{ __("Amount") }}</th>
                </tr>
              </thead>
              <tbody v-if="transactions && transactions.length > 0">
                <tr
                  v-for="(transaction, index) in transactions"
                  :key="transaction.id"
                >
                  <th style="width: 80px">#{{ index + 1 }}</th>
                  <td>
                    {{ transaction.created_at | moment("DD/MM/YYYY hh:mm A") }}
                  </td>
                  <th>{{ transaction.transactionable.invoice }}</th>
                  <th>{{ transaction.transaction_type.name }}</th>
                  <th>{{ transaction.media.name }}</th>
                  <th class="text-left">{{ transaction.description }}</th>
                  <th class="text-right">{{ transaction.amount }}</th>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="6" class="text-right">{{ __("Total") }}</td>
                  <th class="text-right">
                    {{ totalAmount(transactions) }}
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
  name: "StatementPrint",
  props: {
    transactions: Array,
    company: Object,
  },
  data() {
    return {
      hasHeader: false,
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
