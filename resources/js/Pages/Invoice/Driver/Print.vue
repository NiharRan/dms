<template>
  <div class="invoice-card card">
    <div class="card-content">
      <div class="card-body">
        <div class="invoice">
          <div class="invoice-header text-center mb-2 position-relative">
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
            <p><span class="text-bold-700">{{ __('Name') }}{{ __(':') }}</span> {{ driver_invoice.client.name}}</p>
            <p><span class="text-bold-700">{{ __('Address') }}{{ __(':') }} {{ driver_invoice.client.address}}</span></p>
            <p><span class="text-bold-700">{{ __('Driver Name') }}{{ __(':') }}</span> {{ driver_invoice.driver_name }}</p>
            <p class="clearfix">
              <span class="float-left">{{ __('Track No.') }}-{{ driver_invoice.track_no }}</span>
              <span class="float-right">{{ __('Phone:') }} {{ translate(driver_invoice.driver_phone) }}</span>
            </p>

            <table class="table font-medium-3">
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
            <p><span>{{ __('In Words') }}{{ __(':') }}</span> {{ driver_invoice.word }}</p>
            <p class="mb-0 signature">
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "Print",
        props: {
          driver_invoice: Object
        },
        created() {
          window.print();
        }
    }
</script>

<style>
  *{
    font-family: 'SolaimanLipi',sans-serif;
    font-size: 20px !important;
  }
  .owner {
    background-color: black;
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
  }
</style>
