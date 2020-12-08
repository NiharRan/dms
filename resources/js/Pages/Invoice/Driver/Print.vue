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
                :src="driver_invoice.company.current_logo"
                class="width-95-per"
                :alt="driver_invoice.company.name"
              />
            </div>
            <h1 style="font-weight: bolder" class="mb-0">
              {{ driver_invoice.company.name }}
            </h1>
            <h5>{{ driver_invoice.company.description }}</h5>
            <p class="my-1">
              <span class="owner"
                >{{ __("Pro:-") }} {{ driver_invoice.company.owner }}</span
              >
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Head Office") }}: </span
              >{{ driver_invoice.company.head_office }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Dipu Office") }}: </span
              >{{ driver_invoice.company.dipu_office }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Address") }}: </span
              >{{ driver_invoice.company.address }}
            </p>
            <p class="mb-0">
              <span class="text-bold-700">{{ __("Sales Center") }}: </span
              >{{ driver_invoice.company.sales_center }}
            </p>
            <p class="mb-0">
              <span class="text-left">
                <span class="text-bold-700"> {{ __("Phone:") }}</span>
                {{
                  driver_invoice.company.active_phones
                    ? translate(driver_invoice.company.active_phones.toString())
                    : ""
                }}
              </span>
              <span class="text-right">
                <span class="text-bold-700"> {{ __("Email:") }}</span>
                {{ driver_invoice.company.email }}
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
                >{{ __("Serial No.") }}-{{ driver_invoice.invoice }}</span
              >
              <span class="float-right"
                >{{ __("Date") }}{{ __(":") }}
                {{ driver_invoice.created_at | moment("DD/MM/YYYY") }}</span
              >
            </p>
            <p class="d-flex" style="justify-content: space-between">
              <span
                >{{ __("Client Name") }}{{ __(":") }}
                {{ driver_invoice.client.name }}</span
              >
              <span
                >{{ __("Address") }}{{ __(":") }}
                {{ driver_invoice.client.address }}</span
              >
              <span
                >{{ __("Contact No.") }}{{ __(":") }}
                {{ driver_invoice.client_phone }}</span
              >
            </p>
            <p class="d-flex" style="justify-content: space-between">
              <span
                >{{ __("Driver Name") }}{{ __(":") }}
                {{ driver_invoice.driver_name }}</span
              >
              <span>{{ __("Track No.") }}-{{ driver_invoice.track_no }}</span>
              <span
                >{{ __("Dri: Mobile:") }}
                {{
                  driver_invoice.driver_phone
                }}</span
              >
            </p>

            <table class="table table-bordered font-medium-3 mt-2">
              <thead>
                <tr>
                  <th>{{ __("Description of Products") }}</th>
                  <th class="text-center">{{ __("Measurement Type") }}</th>
                  <th class="text-center">
                    <span v-if="driver_invoice.measurement_type.id == 1">
                      {{ __("Length") }} * {{ __("Breadth") }} *
                      {{ __("Height") }}
                    </span>
                  </th>
                  <th class="text-center">{{ __("Quantity") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{{ driver_invoice.product.name }}</th>
                  <th class="text-center">
                    {{ driver_invoice.measurement_type.name }}
                  </th>
                  <th class="text-center">
                    <span v-if="driver_invoice.container_height">
                      {{ driver_invoice.container_height }} In *
                      {{ driver_invoice.container_length }} In *
                      {{ driver_invoice.container_breadth }} In
                    </span>
                  </th>
                  <th class="text-center">{{ driver_invoice.quantity }}</th>
                </tr>
                <tr>
                  <th>{{ __("Track Rent") }}</th>
                  <th></th>
                  <th></th>
                  <th class="text-right">{{ driver_invoice.track_rent }}</th>
                </tr>
                <tr>
                  <th>{{ __("Others") }}</th>
                  <th></th>
                  <th></th>
                  <th class="text-right">{{ driver_invoice.others }}</th>
                </tr>

                <tr>
                  <th colspan="3" class="text-right">
                    {{ __("Total Amount") }}
                  </th>
                  <th class="text-right">{{ driver_invoice.total }}</th>
                </tr>
                <tr>
                  <th colspan="3" class="text-right">{{ __("Borrow") }}</th>
                  <th class="text-right">{{ driver_invoice.borrow }}</th>
                </tr>
                <tr>
                  <th colspan="3" class="text-right">
                    {{ __("Final Amount") }}
                  </th>
                  <th class="text-right">{{ driver_invoice.final }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="invoice-footer">
            <p>
              <span>{{ __("In Words") }}{{ __(":") }}</span>
              {{ driver_invoice.word }}
            </p>
            <p class="mb-0 signature">
              <span class="border-top-dashed float-left">
                <span class="text-bold-700">
                  {{ __("Signature of Driver") }}{{ __(":") }}
                  {{ driver_invoice.driver_name }}
                </span>
              </span>
              <span class="border-top-dashed float-right">
                <span class="text-bold-700">
                  {{ __("In Favor of") }}{{ __(":") }}</span
                >
                {{ driver_invoice.company.name }}
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
    driver_invoice: Object,
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
  background-color: #000 !important;
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
