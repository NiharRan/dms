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
                :src="sale.company.current_logo"
                class="width-95-per"
                :alt="sale.company.name"
              />
            </div>
            <h1 style="font-weight: bolder" class="mb-0">
              {{ sale.company.name }}
            </h1>
            <h5>{{ sale.company.description }}</h5>
            <p class="my-1">
              <span class="owner"
                >{{ __("Pro:-") }} {{ sale.company.owner }}</span
              >
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Head Office") }}: </span
              >{{ sale.company.head_office }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Dipu Office") }}: </span
              >{{ sale.company.dipu_office }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Address") }}: </span
              >{{ sale.company.address }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Sales Center") }}: </span
              >{{ sale.company.sales_center }}
            </p>
            <p class="mb-0">
              <span class="text-left">
                <span class="text-bold-700"> {{ __("Phone:") }}</span>
                {{ translate(sale.company.active_phones.toString()) }}
              </span>
              <span class="text-right">
                <span class="text-bold-700"> {{ __("Email:") }}</span>
                {{ sale.company.email }}
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
            <p class="clearfix">
              <span class="float-left"
                >{{ __("Serial No.") }}-{{ sale.invoice }}</span
              >
              <span class="float-right"
                >{{ __("Date") }}{{ __(":") }}
                {{ sale.created_at | moment("DD/MM/YYYY") }}</span
              >
            </p>
            <p class="clearfix">
              <span class="float-left"
                >{{ __("Client Name") }}{{ __(":") }}
                {{ sale.client.name }}</span
              >
              <span class="float-right"
                >{{ __("Address") }}{{ __(":") }}
                {{ sale.client.address }}</span
              >
            </p>

            <table class="table table-bordered font-medium-3">
              <thead>
                <tr>
                  <th scope="col">{{ __("S.N.") }}</th>
                  <th>{{ __("Track No.") }}</th>
                  <th>{{ __("Product") }}</th>
                  <th class="text-center">{{ __("Product Quantity") }}</th>
                  <th class="text-right">{{ __("Price") }}</th>
                  <th class="text-right">{{ __("Amount") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in sale.sale_details" :key="row.id">
                  <th style="width: 80px">{{ index + 1 }}</th>
                  <th>{{ row.track_no }}</th>
                  <th>{{ row.product.name }}</th>
                  <th class="text-center">{{ row.quantity }} {{ __("Mg") }}</th>
                  <th class="text-right">{{ row.price }}</th>
                  <th class="text-right">{{ row.amount }}</th>
                </tr>
                <tr>
                  <th colspan="5" class="text-right">
                    {{ __("Total Amount") }}
                  </th>
                  <th class="text-right">{{ sale.total_price }}</th>
                </tr>
                <tr>
                  <th colspan="5" class="text-right">{{ __("Paid") }}</th>
                  <th class="text-right">{{ sale.total_paid }}</th>
                </tr>
                <tr>
                  <th colspan="5" class="text-right">{{ __("Due") }}</th>
                  <th class="text-right">{{ sale.total_due }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="invoice-footer">
            <p>
              <span>{{ __("In Words") }}{{ __(":") }}</span> {{ sale.word }}
            </p>
            <p class="mb-0 signature">
              <span class="border-top-dashed float-left">
                <span class="text-bold-700">
                  {{ __("Signature of Client") }}{{ __(":") }}</span
                >
                <span class="text-bold-700">{{ sale.client.name }}</span>
              </span>
              <span class="border-top-dashed float-right">
                <span class="text-bold-700">
                  {{ __("In Favor of") }}{{ __(":") }}</span
                >
                <span class="text-bold-700">{{ sale.company.name }}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Print",
  props: {
    sale: Object,
  },
  data() {
    return {
      hasHeader: false,
    };
  },
  methods: {
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
