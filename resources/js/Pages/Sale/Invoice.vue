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

        <!-- <div class="info-card card">
          <div class="card-content">
            <div class="card-body">
              <ul  class="activity-timeline timeline-left list-unstyled">
                <li>
                  <div class="timeline-icon bg-gradient-success">
                    <i class="feather font-medium-2 icon-plus-circle"></i>
                  </div>
                  <div class="timeline-info">
                    <h3 class="font-weight-bold">Create Invoice</h3>
                    <p class="font-small-3 mb-1">Created on {{ sale.created_at | moment('DD-MM-YY HH:mm A') }}</p>
                    <inertia-link
                      class="btn btn-info"
                      :href="route('sales.edit', sale.id)">
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
                    <p class="font-small-3 mb-1">Status {{ sale.status === 0 ? 'Awaiting payment' : `Payment done at ${sale.created_at}` }}</p>
                    <a v-if="sale.status === 0"
                      @click.prevent="setData"
                      class="btn btn-primary text-white"
                      role="button">
                      <i class="feather icon-file"></i> {{ __('Pay') }}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> -->


        <div class="invoice-card card">
          <div class="card-content">
            <div class="card-header bg-gradient-success">
              <h2 class="card-title mb-1 text-white">Invoice: {{ sale.invoice }}</h2>
            </div>
            <div class="card-body">
              <div class="invoice">
                <div class="invoice-header text-center position-relative">
                  <div class="logo position-absolute width-200">
                    <img :src="sale.company.current_logo" class="width-95-per" :alt="sale.company.name">
                  </div>
                  <h1 style="font-weight: bolder" class="mb-0">{{ sale.company.name }}</h1>
                  <h5>{{ sale.company.description }}</h5>
                  <p class="my-1"><span class="owner">{{ __('Pro:-') }} {{ sale.company.owner }}</span></p>
                  <p class="mb-0"><span class="text-bold-700">{{ __('Head Office') }}: </span>{{ sale.company.head_office }}</p>
                  <p class="mb-0"><span class="text-bold-700">{{ __("Dipu Office") }}: </span>{{ sale.company.dipu_office }}</p>
                  <p class="mb-0"><span class="text-bold-700">{{ __("Address") }}: </span>{{ sale.company.address }}</p>
                  <p class="mb-0"><span class="text-bold-700">{{ __('Sales Center') }}: </span>{{ sale.company.sales_center }}</p>
                  <p class="mb-0">
                  <span class="text-left">
                    <span class="text-bold-700"> {{ __('Phone:') }}</span> {{ translate(sale.company.active_phones.toString()) }}
                  </span>
                    <span class="text-right">
                    <span class="text-bold-700"> {{ __('Email:') }}</span> {{ sale.company.email }}
                  </span>
                  </p>
                </div>
                <div class="invoice-body">
                  <p class="clearfix">
                    <span class="float-left">{{ __('Serial No.') }}-{{ sale.invoice }}</span>
                    <span class="float-right">{{ __('Date') }}{{ __(':') }} {{ sale.created_at | moment('DD/MM/YYYY') }}</span>
                  </p>
                  <p class="clearfix">
                    <span class="float-left">{{ __('Client Name') }}{{ __(':') }} {{ sale.client.name }}</span>
                    <span class="float-right">{{ __('Address') }}{{ __(':') }} {{ sale.client.address }}</span>
                  </p>
                  <table class="table font-medium-3">
                    <thead>
                    <tr>
                      <th>{{ __('Track No.') }}</th>
                      <th>{{ __('Stock') }}</th>
                      <th>{{ __('Product Type') }}</th>
                      <th class="text-center">{{ __('Product Quantity') }}</th>
                      <th class="text-right">{{ __('Price') }}</th>
                      <th class="text-right">{{ __('Amount') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in sale.sale_details" :key="row.id">
                      <th>{{ row.track_no }}</th>
                      <th>{{ row.stock.name }}</th>
                      <th>{{ row.product.name }}</th>
                      <th class="text-center">{{ parseFloat(row.quantity).toFixed(3) }} {{ __('Mg')}}</th>
                      <th class="text-right">{{ parseFloat(row.price).toFixed(3) }}</th>
                      <th class="text-right">{{ parseFloat(row.amount).toFixed(3) }}</th>
                    </tr>
                    <tr>
                      <th colspan="5" class="text-right">{{ __('Total Amount') }}</th>
                      <th class="text-right">{{ parseFloat(sale.total_price).toFixed(3) }}</th>
                    </tr>
                    <tr>
                      <th colspan="5" class="text-right">{{ __('Paid') }}</th>
                      <th class="text-right">{{ parseFloat(sale.total_paid).toFixed(3) }}</th>
                    </tr>
                    <tr>
                      <th colspan="5" class="text-right">{{ __('Due') }}</th>
                      <th class="text-right">{{ parseFloat(sale.total_due).toFixed(3) }}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="invoice-footer">
                  <p><span>{{ __('In Words') }}{{ __(':') }}</span> {{ sale.word }}</p>
                  <p class="mb-0">
                  <span class="float-left">
                    <span class="text-bold-700"> {{ __('Signature of Client') }}{{ __(':') }}</span>
                    <span class="underlined">{{ sale.client.name }}</span>
                  </span>
                    <span class="float-right">
                    <span class="text-bold-700"> {{ __('In Favor of') }}{{ __(':') }}</span> 
                    <span class="underlined">{{ sale.company.name }}</span>
                  </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div class="card-footer text-right">
              <a v-if="sale.status === 0"
                @click.prevent="setData"
                class="btn btn-success text-white"
                role="button">
                <i class="feather icon-file"></i> {{ __('Due Payment') }}
              </a>

              <a :href="route('sales.edit', sale.id)" class="btn btn-primary"><i class="feather icon-edit"></i>
                {{ __("Edit") }}</a>
              <a :href="route('sales.invoices.print', sale.invoice)" target="_blank" class="btn btn-info"><i class="feather icon-printer"></i>
                {{ __("Print") }}</a>
              <!-- <a @click.prevent="printPage" href="" class="btn btn-success"><i class="feather icon-download"></i>
                {{ __("Download") }}</a> -->

            </div>
          </div>
        </div>
      </div>
      <!-- Ag Grid users list section end -->
    </section>
    <model>
      <template v-slot:header>
        <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
        <button type="button" @click="cleanForm" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </template>

      <form @submit.prevent="payment">
        <div class="modal-body">
          <div class="form-group">
            <label>{{ __('Total Amount') }}</label>
            <input type="text"
                   :placeholder="__('Total Amount')"
                   class="form-control"
                   readonly
                   v-model="form.total_price">
          </div>
          <div class="form-group">
            <label>{{ __('Paid') }}</label>
            <input type="text"
                   :placeholder="__('Paid')"
                   class="form-control"
                   readonly
                   v-model="form.total_paid">
          </div>
          <div class="form-group">
            <label>{{ __('Due') }}</label>
            <input type="text"
                   :placeholder="__('Due')"
                   class="form-control"
                   readonly
                   v-model="form.total_due">
          </div>
          <div class="form-group mb-0">
            <label>{{ __('Amount') }}</label>
            <input type="text"
                   :placeholder="__('Amount')"
                   class="form-control"
                   v-model="form.amount">
            <span v-if="errors.amount" class="invalid-feedback" style="display: block;" role="alert">
              <strong>{{ errors.amount[0] }}</strong>
            </span>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-success waves-effect waves-light">{{ __('Update') }}</button>
          <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">{{ __('Cancel') }}</button>
        </div>
      </form>
    </model>
    <!-- product type list ends -->
  </layout>
</template>

<script>
  import Layout from "../../Shared/Layout";
  import Model from "../../Components/Model";

  export default {
    name: "DriverInvoiceShow",
    components: {Layout, Model},
    props: {
      success: String,
      sale: Object,
      errors: Object
    },
    data: function () {
      return {
        modelTitle: this.__('Update Due Amount'),
        form: {
          amount: '0',
          total_price: '',
          total_due: '',
          total_paid: '',
          invoice: ''
        }
      }
    },
    methods: {
      printPage: function () {
        window.print();
      },
      cleanForm: function () {
        $("#default").modal('hide');
        this.form.total_price = '';
        this.form.total_paid = '';
        this.form.total_due = '';
        this.form.amount = '';
        this.form.invoice = '';
      },
      payment: function () {
        let self = this;
        this.$inertia.post(this.route('sales.invoices.pay', this.form.invoice), {
          amount: this.form.amount
        })
        .then(function (response) {
          self.cleanForm();
        });
      },
      setData: function () {
        $("#default").modal('show');
        this.form.total_price = this.sale.total_price;
        this.form.total_paid = this.sale.total_paid;
        this.form.total_due = this.sale.total_due;
        this.form.invoice = this.sale.invoice;
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
