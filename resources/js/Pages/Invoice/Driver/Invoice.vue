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
              <h2 class="card-title mb-1 text-white">{{__("Invoice")}}: {{ driver_invoice.invoice }}</h2>
            </div>
            <div class="card-body">
              <div class="invoice">
                <div class="invoice-header text-center position-relative">
                  <div class="logo position-absolute width-200">
                    <img :src="driver_invoice.company.current_logo" class="width-95-per" :alt="driver_invoice.company.name">
                  </div>
                  <h1 style="font-weight: bolder" class="mb-0">{{ driver_invoice.company.name }}</h1>
                  <h5>{{ driver_invoice.company.description }}</h5>
                  <p class="my-1"><span class="owner">{{ __('Pro:-') }} {{ driver_invoice.company.owner }}</span></p>
                  <p class="mb-0"><span class="text-bold-700">{{ __('Head Office') }}: </span>{{ driver_invoice.company.head_office }}</p>
                  <p class="mb-0"><span class="text-bold-700">{{ __("Dipu Office") }}: </span>{{ driver_invoice.company.dipu_office }}</p>
                  <p class="mb-0"><span class="text-bold-700">{{ __("Address") }}: </span>{{ driver_invoice.company.address }}</p>
                  <p class="mb-0"><span class="text-bold-700">{{ __('Sales Center') }}: </span>{{ driver_invoice.company.sales_center }}</p>
                  <p class="mb-0">
                  <span class="text-left">
                    <span class="text-bold-700"> {{ __('Phone:') }}</span> {{ translate(driver_invoice.company.active_phones.toString()) }}
                  </span>
                    <span class="text-right">
                    <span class="text-bold-700"> {{ __('Email:') }}</span> {{ driver_invoice.company.email }}
                  </span>
                  </p>
                </div>
                <div class="invoice-body">
                  <p class="clearfix">
                    <span class="float-left">{{ __('Serial No.') }}-{{ driver_invoice.invoice }}</span>
                    <span class="float-right">{{ __('Date') }}{{ __(':') }} {{ driver_invoice.created_at | moment('DD/MM/YYYY') }}</span>
                  </p>
                  <p class="d-flex" style="justify-content: space-between;">
                    <span>{{ __("Client Name") }}{{ __(":") }} {{ driver_invoice.client.name }}</span>
                    <span>{{ __("Client Address") }}{{ __(":") }} {{ driver_invoice.client.address }}</span>
                    <span>{{ __("Driver Name") }}{{ __(":") }} {{ driver_invoice.driver_name }}</span>
                  </p>
                  <p class="row">
                    <span class="col-6 text-left">{{ __('Track No.') }}-{{ driver_invoice.track_no }}</span>
                    <span class="col-6 text-right">{{ __('Dri: Mobile:') }} {{ translate(driver_invoice.driver_phone) }}</span>
                  </p>

                  <table class="table font-medium-3">
                    <thead>
                    <tr>
                      <th>{{ __('Description of Products') }}</th>
                      <th class="text-center">{{ __('Measurement Type') }}</th>
                      <th class="text-center">{{ __('Height') }} * {{ __('Length') }} * {{ __('Breadth') }}</th>
                      <th class="text-center">{{ __('Quantity') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th>{{ driver_invoice.product.name }}</th>
                      <th class="text-center">{{ driver_invoice.measurement_type.name }}</th>
                      <th class="text-center">{{ driver_invoice.container_height }} * {{ driver_invoice.container_length }} * {{ driver_invoice.container_breadth }}</th>
                      <th class="text-center">{{ driver_invoice.quantity }}</th>
                    </tr>
                    <tr>
                      <th>{{ __('Track Rent') }}</th>
                      <th></th>
                      <th></th>
                      <th class="text-right">{{ driver_invoice.track_rent }}</th>
                    </tr>
                    <tr>
                      <th>{{ __('Others') }}</th>
                      <th></th>
                      <th></th>
                      <th class="text-right">{{ driver_invoice.others }}</th>
                    </tr>

                    <tr>
                      <th colspan="3" class="text-right">{{ __('Total Amount') }}</th>
                      <th class="text-right">{{ driver_invoice.total }}</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __('Paid') }}</th>
                      <th class="text-right">{{ driver_invoice.paid }}</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __('Due') }}</th>
                      <th class="text-right">{{ driver_invoice.due }}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="invoice-footer">
                  <p><span>{{ __('In Words') }}{{ __(':') }}</span> {{ driver_invoice.word }}</p>
                  <p class="mb-0">
                  <span class="float-left">
                    <span class="text-bold-700"> {{ __('Signature of Driver') }}{{ __(':') }}</span>
                  </span>
                    <span class="float-right">
                    <span class="text-bold-700"> {{ __('In Favor of') }}{{ __(':') }}</span> {{ driver_invoice.company.name }}
                  </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer text-right">
              <inertia-link
                v-if="driver_invoice.status === 0"
                class="btn btn-primary"
                :href="route('drivers.invoices.pay', driver_invoice.invoice)">
                {{__("Mark Paid")}}
              </inertia-link>
              <inertia-link :href="route('drivers.invoices.edit', driver_invoice.id)" class="btn btn-primary"><i class="feather icon-edit"></i>
                {{ __("Edit") }}</inertia-link>
              <inertia-link :href="route('drivers.invoices.print', driver_invoice.invoice)" target="_blank" class="btn btn-info"><i class="feather icon-printer"></i>
                {{ __("Print") }}</inertia-link>

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

  export default {
    name: "DriverInvoiceShow",
    components: {Layout},
    props: {
      success: String,
      driver_invoice: Object,
    },
    data: function () {
      return {

      }
    },
    methods: {
      printPage: function () {
        window.print();
      }
    },
    created() {

    }
  }
</script>
<style>
  *{
    font-family: 'SolaimanLipi',sans-serif;
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
