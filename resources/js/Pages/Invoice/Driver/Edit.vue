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

              <form @submit.prevent="update">
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label>{{__("Client")}}<strong class="text-danger">*</strong></label>
                    <multi-select
                      v-model="driver_invoice.client"
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
                    <label>{{__('Client Contact No.')}}</label>
                    <input type="text"
                           v-model="driver_invoice.client.phone"
                           readonly
                           :placeholder="__('Client Contact No.')"
                           class="form-control">
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{ __('Client Address') }}</label>
                    <input type="text"
                           v-model="driver_invoice.client.address"
                           readonly
                           :placeholder="__('Client Address')"
                           class="form-control">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label>{{__("Driver Name")}}<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="driver_invoice.driver_name"
                           :class="[errors.driver_name ? 'in-invalid' : '' ]"
                           :placeholder="__('Driver Name')"
                           class="form-control">

                    <span v-if="errors.driver_name" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.driver_name[0] }}</strong>
                    </span>
                  </div>

                  <div class="col-md-4 col-12">
                    <label>{{__("Track Number")}}<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="driver_invoice.track_no"
                           :class="[errors.track_no ? 'in-invalid' : '' ]"
                           :placeholder="__('Track Number')"
                           class="form-control">

                    <span v-if="errors.track_no" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.track_no[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label>{{__("Driver Contact No.")}}<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="driver_invoice.driver_phone"
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
                          v-model="driver_invoice.product"
                          :options="products"
                          label="name"
                          track-by="name"
                          :placeholder="__('Select Product')"></multi-select>
                      </th>
                      <th>
                        <input type="text" v-model="driver_invoice.scale" class="form-control" :placeholder="__('Scale')">
                      </th>
                      <th>
                        <input type="text" v-model="driver_invoice.quantity" class="form-control" :placeholder="__('Quantity')">
                        <span v-if="errors.quantity" class="invalid-feedback" style="display: block;" role="alert">
                          <strong>{{ errors.quantity[0] }}</strong>
                        </span>
                      </th>
                      <th>
                        <input type="text" class="form-control" v-model="driver_invoice.amount" @keyup="calculateTotal" :placeholder="__('Scale Price')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Track Rent") }}</th>
                      <th>
                        <input type="text" class="form-control" v-model="driver_invoice.track_rent" @keyup="calculateTotal" :placeholder="__('Track Rent')">

                        <span v-if="errors.track_rent" class="invalid-feedback" style="display: block;" role="alert">
                          <strong>{{ errors.track_rent[0] }}</strong>
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Others") }}</th>
                      <th>
                        <input type="text" class="form-control" v-model="driver_invoice.others" @keyup="calculateTotal" :placeholder="__('Others')">
                      </th>
                    </tr>

                    <tr>
                      <th colspan="3" class="text-right">{{ __("Total") }}</th>
                      <th>
                        <input type="text" class="form-control" readonly v-model="driver_invoice.total" :placeholder="__('Total')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Paid") }}</th>
                      <th>
                        <input type="text" class="form-control" @keyup="calculateDue" v-model="driver_invoice.paid" :placeholder="__('Paid')">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="3" class="text-right">{{ __("Due") }}</th>
                      <th>
                        <input type="text" class="form-control" readonly v-model="driver_invoice.due" :placeholder="__('Due')">
                      </th>
                    </tr>

                    <tr>
                      <th colspan="6" class="text-right">
                        <inertia-link :href="route('drivers.invoices.show', driver_invoice.invoice)" class="btn btn-secondary">
                          <i class="feather icon-arrow-left"></i> {{ __("Back") }}
                        </inertia-link>
                        <button type="submit" class="btn btn-success"><i class="feather icon-printer"></i> {{ __("Update") }}</button>
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
      driver_invoice: Object,
      clients: Array,
      products: Array,
      errors: Object,
    },
    data: function () {
      return {

      }
    },
    methods: {
      showInfo: function (data) {
        this.driver_invoice.phone = data.phone;
        this.driver_invoice.address = data.address;
      },
      calculateTotal: function () {
        let amount = this.driver_invoice.amount;
        let track_rent = this.driver_invoice.track_rent;
        let others = this.driver_invoice.others;
        let paid = this.driver_invoice.paid;

        let total = parseFloat(amount) + parseFloat(track_rent) + parseFloat(others);
        let due = total - parseFloat(paid);
        this.driver_invoice.total = parseFloat(total).toFixed(2);
        this.driver_invoice.due = parseFloat(due).toFixed(2);
      },
      calculateDue: function () {
        let total = this.driver_invoice.total;
        let paid = this.driver_invoice.paid;
        let due = parseFloat(total) - parseFloat(paid);
        this.driver_invoice.due = parseFloat(due).toFixed(2);
      },
      update: async function () {
        const self = this;
        const client_id = this.driver_invoice.client ? this.driver_invoice.client.id : '';
        const product_id = this.driver_invoice.product ? this.driver_invoice.product.id : '';
        this.$inertia.put(this.route('drivers.invoices.update', this.driver_invoice.id), {
          client_id: client_id,
          company_id: this.driver_invoice.company.id,
          driver_name: this.driver_invoice.driver_name,
          track_no: this.driver_invoice.track_no,
          driver_phone: this.driver_invoice.driver_phone,
          product_id: product_id,
          quantity: this.driver_invoice.quantity,
          scale: this.driver_invoice.scale,
          amount: this.driver_invoice.amount,
          track_rent: this.driver_invoice.track_rent,
          others: this.driver_invoice.others,
          total: this.driver_invoice.total,
          paid: this.driver_invoice.paid,
          due: this.driver_invoice.due,
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
