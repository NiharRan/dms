<template>
  <layout name="DriverInvoiceCreate">
    <!-- product list start -->
    <section class="users-list-wrapper">
      <!-- product section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <form @submit.prevent="store">
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label>{{ __("Client") }}<strong class="text-danger">*</strong></label>
                    <multi-select
                      v-model="form.client"
                      :options="clients"
                      :class="[errors.client_id ? 'in-invalid' : '' ]"
                      @select="showInfo"
                      label="name"
                      track-by="name"
                      :placeholder="__('Select Client')"></multi-select>

                    <span v-if="errors.client_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.client_id[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __('Client Contact No.') }}</label>
                    <input type="text"
                           v-model="form.phone"
                           readonly
                           :placeholder="__('Client Contact No.')"
                           class="form-control">
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __("Client Address") }}</label>
                    <input type="text"
                           v-model="form.address"
                           readonly
                           :placeholder="__('Client Address')"
                           class="form-control">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label>{{ __("Driver Name") }}<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.driver_name"
                           :class="[errors.driver_name ? 'in-invalid' : '' ]"
                           :placeholder="__('Driver Name')"
                           class="form-control">

                    <span v-if="errors.driver_name" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.driver_name[0] }}</strong>
                    </span>
                  </div>

                  <div class="col-md-4 col-12">
                    <label>{{ __("Track Number") }}<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.track_no"
                           :class="[errors.track_no ? 'in-invalid' : '' ]"
                           :placeholder="__('Track Number')"
                           class="form-control">

                    <span v-if="errors.track_no" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.track_no[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __("Driver Contact No.") }}<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.driver_phone"
                           :class="[errors.driver_phone ? 'in-invalid' : '' ]"
                           :placeholder="__('Driver Contact No.')"
                           class="form-control">

                    <span v-if="errors.driver_phone" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.driver_phone[0] }}</strong>
                    </span>
                  </div>

                </div>

                <div class="form-group">
                  <table class="table table-bordered table-responsive-sm">
                    <tr>
                      <th>
                        <multi-select
                          v-model="form.product"
                          :options="products"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Product')"></multi-select>
                      </th>
                      <th>
                        <input type="text" v-model="form.scale" class="form-control" :placeholder="__('Scale')">
                      </th>
                      <th>
                        <input type="text" v-model="form.quantity" class="form-control" :placeholder="__('Quantity')">
                        <span v-if="errors.quantity" class="invalid-feedback" style="display: block;" role="alert">
                          <strong>{{ errors.quantity[0] }}</strong>
                        </span>
                      </th>
                      <th>
                        <input type="text" class="form-control" v-model="form.amount" @keyup="calculateTotal" :placeholder="__('Scale Price')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Rent") }}</th>
                      <th>
                        <input type="text" class="form-control" v-model="form.track_rent" @keyup="calculateTotal" :placeholder="__('Rent')">
                        <span v-if="errors.track_rent" class="invalid-feedback" style="display: block;" role="alert">
                          <strong>{{ errors.track_rent[0] }}</strong>
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Others") }}</th>
                      <th>
                        <input type="text" class="form-control" v-model="form.others" @keyup="calculateTotal">
                      </th>
                    </tr>

                    <tr>
                      <th colspan="3" class="text-right">{{ __("Total") }}</th>
                      <th>
                        <input type="text" class="form-control" readonly v-model="form.total" :placeholder="__('Total')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Paid") }}</th>
                      <th>
                        <input type="text" class="form-control" @keyup="calculateDue" v-model="form.paid" :placeholder="__('Paid')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Due") }}</th>
                      <th>
                        <input type="text" class="form-control" readonly v-model="form.due" :placeholder="__('Due')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="6" class="text-right">
                        <button type="button" class="btn btn-secondary"><i class="feather icon-x"></i> {{ __('Cancel') }}</button>
                        <button type="submit" class="btn btn-success"><i class="feather icon-printer"></i> {{ __("Store") }}</button>
                      </th>
                    </tr>
                  </table>
                </div>
              </form>
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
    name: "DriverInvoiceCreate",
    components: {Model, Layout},
    props: {
      success: String,
      clients: Array,
      products: Array,
      company: Object,
      errors: Object,
    },
    data: function () {
      return {
        form: {
          id: '',
          company: null,
          client: null,
          phone: '',
          address: '',
          product: null,
          quantity: '',
          scale: '',
          amount: '',
          driver_name: '',
          track_no: '',
          driver_phone: '',
          others: '',
          track_rent: '',
          total: '',
          paid: '',
          due: ''
        },
      }
    },
    methods: {
      showInfo: function (data) {
        this.form.phone = data.phone;
        this.form.address = data.address;
      },
      calculateTotal: function () {
        let amount = this.form.amount === '' ? 0 : this.form.amount;
        let track_rent = this.form.track_rent === '' ? 0 : this.form.track_rent;
        let others = this.form.others === '' ? 0 : this.form.others;
        let paid = this.form.paid === '' ? 0 : this.form.paid;

        let total = parseFloat(amount) + parseFloat(track_rent) + parseFloat(others);
        let due = total - parseFloat(paid);
        this.form.total = parseFloat(total).toFixed(2);
        this.form.due = parseFloat(due).toFixed(2);
      },
      calculateDue: function () {
        let total = this.form.total === '' ? 0 : this.form.total;
        let paid = this.form.paid === '' ? 0 : this.form.paid;
        let due = parseFloat(total) - parseFloat(paid);
        this.form.due = parseFloat(due).toFixed(2);
      },
      store: async function () {
        const self = this;
        const client_id = this.form.client ? this.form.client.id : '';
        const product_id = this.form.product ? this.form.product.id : '';
        this.$inertia.post(this.route('drivers.invoices.store'), {
          client_id: client_id,
          company_id: this.company.id,
          driver_name: this.form.driver_name,
          track_no: this.form.track_no,
          driver_phone: this.form.driver_phone,
          product_id: product_id,
          quantity: this.form.quantity,
          scale: this.form.scale,
          amount: this.form.amount,
          track_rent: this.form.track_rent,
          others: this.form.others,
          total: this.form.total,
          paid: this.form.paid,
          due: this.form.due
        });
      },
    },
    created() {
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
