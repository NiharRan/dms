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
                    <label>Client<strong class="text-danger">*</strong></label>
                    <multi-select
                      v-model="form.client"
                      :options="clients"
                      :class="[errors.client_id ? 'in-invalid' : '' ]"
                      @select="showInfo"
                      label="name"
                      track-by="name"
                      placeholder="Select Client"></multi-select>

                    <span v-if="errors.client_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.client_id[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label>Client Contact No.</label>
                    <input type="text"
                           v-model="form.phone"
                           readonly
                           placeholder="Client Contact No."
                           class="form-control">
                  </div>
                  <div class="col-md-4 col-12">
                    <label>Client Address</label>
                    <input type="text"
                           v-model="form.address"
                           readonly
                           placeholder="Client Address"
                           class="form-control">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-4 col-12">
                    <label>Driver Name<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.driver_name"
                           :class="[errors.driver_name ? 'in-invalid' : '' ]"
                           placeholder="Driver Name"
                           class="form-control">

                    <span v-if="errors.driver_name" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.driver_name[0] }}</strong>
                    </span>
                  </div>

                  <div class="col-md-4 col-12">
                    <label>Track Number<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.track_no"
                           :class="[errors.track_no ? 'in-invalid' : '' ]"
                           placeholder="Track Number"
                           class="form-control">

                    <span v-if="errors.track_no" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.track_no[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-4 col-12">
                    <label>Driver Contact No.<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.driver_phone"
                           :class="[errors.driver_phone ? 'in-invalid' : '' ]"
                           placeholder="Driver Contact No."
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
                          placeholder="Select Product"></multi-select>
                      </th>
                      <th>
                        <input type="text" v-model="form.quantity" class="form-control" placeholder="Quantity">
                      </th>
                      <th>
                        <input type="text" class="form-control" v-model="form.amount" @keyup="calculateTotal">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2" class="text-right">{{ __("Track Rent") }}</th>
                      <th>
                        <input type="text" class="form-control" v-model="form.track_rent" @keyup="calculateTotal">
                        <span v-if="errors.track_rent" class="invalid-feedback" style="display: block;" role="alert">
                          <strong>{{ errors.track_rent[0] }}</strong>
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2" class="text-right">{{ __("Others") }}</th>
                      <th>
                        <input type="text" class="form-control" v-model="form.others" @keyup="calculateTotal">
                      </th>
                    </tr>

                    <tr>
                      <th colspan="2" class="text-right">{{ __("Total") }}</th>
                      <th>
                        <input type="text" class="form-control" readonly v-model="form.total">
                      </th>
                    </tr>
                    <tr>
                      <th colspan="5" class="text-right">
                        <button type="button" class="btn btn-secondary"><i class="feather icon-x"></i> Cancel</button>
                        <button type="submit" class="btn btn-success"><i class="feather icon-printer"></i> Save</button>
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
          amount: '0.00',
          driver_name: '',
          track_no: '',
          driver_phone: '',
          others: '0.00',
          track_rent: '0.00',
          total: '0.00'
        },
      }
    },
    methods: {
      showInfo: function (data) {
        this.form.phone = data.phone;
        this.form.address = data.address;
      },
      calculateTotal: function () {
        let amount = this.driver_invoice.amount === '' ? 0 : this.driver_invoice.amount;
        let track_rent = this.driver_invoice.track_rent === '' ? 0 : this.driver_invoice.track_rent;
        let others = this.driver_invoice.others === '' ? 0 : this.driver_invoice.others;

        let total = parseFloat(amount) + parseFloat(track_rent) + parseFloat(others);
        this.form.total = parseFloat(total).toFixed(2);
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
          amount: this.form.amount,
          track_rent: this.form.track_rent,
          others: this.form.others,
          total: this.form.total,
        })
          .then(function () {
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
