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
                  <th style="width: 10%">{{ __("Client") }}</th>
                  <th>{{ __("Driver") }}</th>
                  <th class="text-center">{{ __("Invoice") }}</th>
                  <th>{{ __("Product") }}</th>
                  <th>{{ __("Measurement Type") }}</th>
                  <th class="text-right">{{ __("Track Rental") }}</th>
                </tr>
              </thead>
              <tbody v-if="driver_invoices.length > 0">
                <tr
                  v-for="(driver_invoice, index) in driver_invoices"
                  :key="index"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    {{ driver_invoice.created_at | moment("DD/MM/YYYY") }}
                  </td>
                  <td>
                    {{ driver_invoice.client.name }}
                  </td>
                  <td>
                    {{ driver_invoice.driver_name }}
                  </td>
                  <th class="text-center">
                    {{ driver_invoice.invoice }}
                  </th>
                  <th class="text-center">
                    {{ driver_invoice.product.name }}
                  </th>
                  <td>
                    <p class="mb-0">
                      <strong style="font-size: 13px !important;">{{
                        driver_invoice.measurement_type.name
                      }}</strong>
                    </p>
                    <p class="mb-0" style="font-size: 13px !important;">
                      {{ __("Height") }}{{ __(":") }}
                      {{ driver_invoice.container_height }}
                    </p>
                    <p class="mb-0" style="font-size: 13px !important;">
                      {{ __("Length") }}{{ __(":") }}
                      {{ driver_invoice.container_length }}
                    </p>
                    <p class="mb-0" style="font-size: 13px !important;">
                      {{ __("Breadth") }}{{ __(":") }}
                      {{ driver_invoice.container_breadth }}
                    </p>
                  </td>
                  <td class="text-right">
                    {{ parseFloat(driver_invoice.final).toFixed(3) }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="bt">
                <tr>
                  <td colspan="7" class="text-right">{{ __("Total") }}</td>
                  <th class="text-right">{{ totalFinal(driver_invoices) }}</th>
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
    driver_invoices: Array,
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
        (total, invoice) => total + parseFloat(invoice.total),
        0
      );
      return parseFloat(totalPrice).toFixed(3);
    },
    totalBorrow: function (data) {
      let borrowPrice = data.reduce((borrow, invoice) => {
        let p = invoice.borrow == "" ? 0 : invoice.borrow;
        return borrow + parseFloat(p);
      }, 0);
      return parseFloat(borrowPrice).toFixed(3);
    },
    totalFinal: function (data) {
      let finalPrice = data.reduce((final, invoice) => {
        let d = invoice.final == "" ? 0 : invoice.final;
        return final + parseFloat(d);
      }, 0);
      return parseFloat(finalPrice).toFixed(3);
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
