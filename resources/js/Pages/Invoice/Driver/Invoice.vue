<template>
  <layout name="DriverInvoiceShow">
    <!-- product list start -->
    <section class="users-list-wrapper">
      <!-- product section start -->
      <div id="basic-examples">
        <div v-if="success" class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="alert alert-success">
                {{ success }}
              </div>
            </div>
          </div>
        </div>

        <div class="invoice-card card">
          <div class="card-content">
            <div class="card-header bg-gradient-success">
              <h2 class="card-title mb-1 text-white">
                {{ __("Invoice") }}: {{ driver_invoice.invoice }}
              </h2>
            </div>
            <div class="card-body">
              <div class="invoice">
                <div class="invoice-header text-center position-relative">
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
                      >{{ __("Pro:-") }}
                      {{ driver_invoice.company.owner }}</span
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
                        translate(
                          driver_invoice.company.active_phones
                            ? driver_invoice.company.active_phones.toString()
                            : ""
                        )
                      }}
                    </span>
                    <span class="text-right">
                      <span class="text-bold-700"> {{ __("Email:") }}</span>
                      {{ driver_invoice.company.email }}
                    </span>
                  </p>
                </div>
                <div class="invoice-body">
                  <p class="clearfix">
                    <span class="float-left"
                      >{{ __("Serial No.") }}-{{ driver_invoice.invoice }}</span
                    >
                    <span class="float-right"
                      >{{ __("Date") }}{{ __(":") }}
                      {{
                        driver_invoice.created_at | moment("DD/MM/YYYY")
                      }}</span
                    >
                  </p>
                  <table class="table invoice-header-table">
                    <tr>
                      <td>
                        <span
                          >{{ __("Client Name") }}{{ __(":") }}
                          {{ driver_invoice.client.name }}</span
                        >
                      </td>
                      <td>
                        <span
                          >{{ __("Driver Name") }}{{ __(":") }}
                          {{ driver_invoice.driver_name }}</span
                        >
                      </td>
                      <td>
                        <span style="margin-right: 100px"
                          >{{ __("Reference") }}{{ __(":") }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          >{{ __("Address") }}{{ __(":") }}
                          {{ driver_invoice.client.address }}</span
                        >
                      </td>
                      <td>
                        <span
                          >{{ __("Track No.") }}-{{
                            driver_invoice.track_no
                          }}</span
                        >
                      </td>
                      <td>
                        <span
                          >{{ __("Dri: Mobile:") }}
                          {{ driver_invoice.driver_phone }}</span
                        >
                      </td>
                    </tr>
                  </table>

                  <table class="table font-medium-3">
                    <thead>
                      <tr>
                        <th>{{ __("Description of Products") }}</th>
                        <th class="text-center">
                          {{ __("Measurement Type") }}
                        </th>
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
                          <span v-if="driver_invoice.container_length">
                            <span class="mess"
                              >{{ driver_invoice.container_length }} In
                            </span>
                            *
                            <span class="mess"
                              >{{ driver_invoice.container_breadth }} In
                            </span>
                            *
                            <span v-if="driver_invoice.container_height">
                              <span class="mess"
                                >{{ driver_invoice.container_height }} In
                              </span>
                            </span>
                          </span>
                        </th>
                        <th class="text-center">
                          {{ parseFloat(driver_invoice.quantity).toFixed(3) }}
                        </th>
                      </tr>
                      <tr>
                        <th>{{ __("Track Rent") }}</th>
                        <th></th>
                        <th></th>
                        <th class="text-right">
                          {{
                            driver_invoice.track_rent
                              ? parseFloat(driver_invoice.track_rent).toFixed(3)
                              : "0.000"
                          }}
                        </th>
                      </tr>
                      <tr>
                        <th>{{ __("Others") }}</th>
                        <th></th>
                        <th></th>
                        <th class="text-right">
                          {{
                            driver_invoice.others
                              ? parseFloat(driver_invoice.others).toFixed(3)
                              : "0.000"
                          }}
                        </th>
                      </tr>

                      <tr>
                        <th colspan="3" class="text-right">
                          {{ __("Total Amount") }}
                        </th>
                        <th class="text-right">
                          {{ parseFloat(driver_invoice.total).toFixed(3) }}
                        </th>
                      </tr>
                      <tr>
                        <th colspan="3" class="text-right">
                          {{ __("Borrow") }}
                        </th>
                        <th class="text-right">
                          {{ parseFloat(driver_invoice.borrow).toFixed(3) }}
                        </th>
                      </tr>
                      <tr>
                        <th colspan="3" class="text-right">
                          {{ __("Final Amount") }}
                        </th>
                        <th class="text-right">
                          {{ parseFloat(driver_invoice.final).toFixed(3) }}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="invoice-footer">
                  <p>
                    <span>{{ __("In Words") }}{{ __(":") }}</span>
                    {{ driver_invoice.word }}
                  </p>
                  <p class="mb-0">
                    <span class="float-left">
                      <span class="text-bold-700">
                        {{ __("Signature of Driver") }}{{ __(":") }}
                        {{ driver_invoice.driver_name }}</span
                      >
                    </span>
                    <span class="float-right">
                      <span class="text-bold-700">
                        {{ __("In Favor of") }}{{ __(":") }}</span
                      >
                      {{ driver_invoice.company.name }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer text-right">
              <inertia-link
                class="btn btn-primary"
                :href="route('drivers.invoices.index')"
              >
                <i class="feather icon-unlock"></i>
                <span class="menu-title" data-i18n="">{{ __("Back") }}</span>
              </inertia-link>
              <inertia-link
                v-if="!driver_invoice.is_commission_added"
                :href="route('drivers.invoices.edit', driver_invoice.id)"
                class="btn btn-info"
                ><i class="feather icon-edit"></i>
                {{ __("Edit") }}</inertia-link
              >
              <inertia-link
                :href="route('drivers.invoices.print', driver_invoice.invoice)"
                target="_blank"
                class="btn btn-warning"
                ><i class="feather icon-printer"></i>
                {{ __("Print") }}</inertia-link
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Ag Grid users list section end -->
    </section>
    <!-- product type list ends -->
  </layout>
</template>

<script>
import Layout from "../../../Shared/Layout";
import Model from "../../../Components/Model";

export default {
  name: "DriverInvoiceShow",
  components: { Layout, Model },
  props: {
    success: String,
    driver_invoice: Object,
    errors: Object,
  },
  data: function () {
    return {};
  },
  methods: {
    printPage: function () {
      window.print();
    },
  },
  created() {},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
* {
  font-family: "SolaimanLipi", sans-serif;
}
.table {
  border-bottom: 1px solid #0b0b0b !important;
}
.owner {
  background-color: black;
  color: #fff;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 18px;
}
@media print {
  .owner {
    background-color: black !important;
    color: #fff !important;
    font-weight: bold !important;
  }
  .main-menu,
  .header-navbar-shadow,
  .content-header,
  .info-card,
  .invoice-card .card-header,
  .card-footer,
  .footer {
    display: none !important;
    visibility: hidden !important;
  }
}
</style>
