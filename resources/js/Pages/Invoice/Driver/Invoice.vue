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

        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <ul  class="activity-timeline timeline-left list-unstyled">
                <li>
                  <div class="timeline-icon bg-gradient-success">
                    <i class="feather font-medium-2 icon-plus-circle"></i>
                  </div>
                  <div class="timeline-info">
                    <h3 class="font-weight-bold">Create Invoice</h3>
                    <p class="font-small-3 mb-1">Created on {{ driver_invoice.created_at | moment('DD-MM-YY HH:mm A') }}</p>
                    <inertia-link
                      class="btn btn-info"
                      :href="route('drivers.invoices.edit', driver_invoice.invoice)">
                      Edit
                    </inertia-link>
                  </div>
                </li>

                <li>
                  <div class="timeline-icon bg-gradient-primary">
                    <i class="fa fa-money font-medium-2"></i>
                  </div>
                  <div class="timeline-info">
                    <h3 class="font-weight-bold">Get Paid</h3>
                    <p class="font-small-3 mb-1">Status {{ driver_invoice.status === 0 ? 'Awaiting payment' : 'Payment done' }}</p>
                    <inertia-link
                      v-if="driver_invoice.status === 0"
                      class="btn btn-primary"
                      :href="route('drivers.invoices.edit', driver_invoice.invoice)">
                      Mark Paid
                    </inertia-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="card-header bg-gradient-success">
              <h2 class="card-title mb-1 text-white">Invoice: {{ driver_invoice.invoice }}</h2>
            </div>
            <div class="card-body">
              <div class="invoice-header text-center">
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
                <p><span class="text-bold-700">{{ __('Name') }}{{ __(':') }}</span> {{ driver_invoice.client.name}}</p>
                <p><span class="text-bold-700">{{ __('Address') }}{{ __(':') }} {{ driver_invoice.client.address}}</span></p>
                <p><span class="text-bold-700">{{ __('Driver Name') }}{{ __(':') }}</span> {{ driver_invoice.driver_name }}</p>
                <p class="row">
                  <span class="col-6 text-left">{{ __('Track No.') }}-{{ driver_invoice.track_no }}</span>
                  <span class="col-6 text-left">{{ __('Phone:') }} {{ translate(driver_invoice.driver_phone) }}</span>
                </p>

                <table class="table table-bordered font-medium-3">
                  <thead>
                  <tr>
                    <th>{{ __('Description of Products') }}</th>
                    <th class="text-center">{{ __('Quantity') }}</th>
                    <th class="text-right">{{ __('Amount') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th>{{ driver_invoice.product.name }}</th>
                    <th class="text-center">{{ driver_invoice.quantity }}</th>
                    <th class="text-right">{{ driver_invoice.amount }}</th>
                  </tr>
                  <tr>
                    <th>{{ __('Track Rent') }}</th>
                    <th></th>
                    <th class="text-right">{{ driver_invoice.track_rent }}</th>
                  </tr>
                  <tr>
                    <th>{{ __('Others') }}</th>
                    <th></th>
                    <th class="text-right">{{ driver_invoice.others }}</th>
                  </tr>

                  <tr>
                    <th colspan="2" class="text-right">{{ __('Total Amount') }}</th>
                    <th class="text-right">{{ driver_invoice.total }}</th>
                  </tr>
                  <tr>
                    <th colspan="2" class="text-right">{{ __('In Advance') }}</th>
                    <th class="text-right"></th>
                  </tr>
                  <tr>
                    <th colspan="2" class="text-right">{{ __('Due') }}</th>
                    <th class="text-right"></th>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="invoice-footer">
                <p class="mb-0">
                  <span class="float-left">
                    <span class="text-bold-700"> {{ __('Signature of Driver') }}{{ __(':') }}</span>
                  </span>
                  <span class="float-right">
                    <span class="text-bold-700"> {{ __('In Favor of') }}{{ __(':') }}</span> {{ driver_invoice.company.owner }}
                  </span>
                </p>
              </div>
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
    },
    created() {

    }
  }
</script>
<style>
  *{
    font-family: 'SolaimanLipi';
  }
.owner {
  background-color: black;
  color: #fff;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 18px;
}
</style>
