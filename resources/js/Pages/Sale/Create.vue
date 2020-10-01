<template>
  <layout name="SaleCreate">
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

              <form>
                <div class="form-group row">
                  <div class="col-md-6 col-12">
                    <label>Client<strong class="text-danger">*</strong></label>
                    <multi-select
                      v-model="form.client"
                      :options="clients"
                      :class="[errors.client_id ? 'in-invalid' : '' ]"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="true"
                      label="name"
                      track-by="name"
                      placeholder="Select Client"></multi-select>

                    <span v-if="errors.client_id" class="invalid-feedback text-center" style="display: block;" role="alert">
                      <strong>{{ errors.client_id[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <label>Driver Name<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.driver_name"
                           :class="[errors.driver_name ? 'in-invalid' : '' ]"
                           placeholder="Driver Name"
                           class="form-control">

                    <span v-if="errors.driver_name" class="invalid-feedback text-center" style="display: block;" role="alert">
                      <strong>{{ errors.driver_name[0] }}</strong>
                    </span>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-6 col-12">
                    <label>Track Number<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.track_no"
                           :class="[errors.track_no ? 'in-invalid' : '' ]"
                           placeholder="Track Number"
                           class="form-control">

                    <span v-if="errors.track_no" class="invalid-feedback text-center" style="display: block;" role="alert">
                      <strong>{{ errors.track_no[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <label>D.L. Number<strong class="text-danger">*</strong></label>
                    <input type="text"
                           v-model="form.dl_no"
                           :class="[errors.dl_no ? 'in-invalid' : '' ]"
                           placeholder="D.L. Number"
                           class="form-control">

                    <span v-if="errors.dl_no" class="invalid-feedback text-center" style="display: block;" role="alert">
                      <strong>{{ errors.dl_no[0] }}</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <label>Products</label>
                  <table class="table table-responsive-sm table-bordered">
                    <thead class="bg-secondary">
                      <tr>
                        <th>Action</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in form.sale_details" :key="index">
                        <th>
                          <button
                            class="btn btn-outline-danger"
                            @click.prevent="removeSaleItem(index)"
                            type="button"><i class="feather icon-trash"></i>
                          </button>
                        </th>
                        <th>
                          <multi-select
                            v-model="row.product"
                            :options="products"
                            :searchable="true"
                            :close-on-select="true"
                            :show-labels="true"
                            label="name"
                            track-by="name"
                            placeholder="Select Product"></multi-select>
                        </th>
                        <th>
                          <input type="text" v-model="row.quantity" class="form-control">
                        </th>
                        <th>
                          <input type="text" v-model="row.price" @keyup="calculateTotal(index)" class="form-control">
                        </th>
                        <th>
                          <input type="text" v-model="row.total" readonly class="form-control">
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <button @click.prevent="addNewItem" class="btn btn-outline-success"><i class="feather icon-plus"></i></button>
                        </th>
                        <th colspan="4"></th>
                      </tr>
                      <tr>
                        <th colspan="4" class="text-right">Total Price</th>
                        <th><input type="text" v-model="form.total_price" readonly class="form-control"></th>
                      </tr>
                      <tr>
                        <th colspan="4" class="text-right">Total Paid</th>
                        <th><input type="text" v-model="form.total_paid" readonly class="form-control"></th>
                      </tr>
                      <tr>
                        <th colspan="4" class="text-right">Total Due</th>
                        <th><input type="text" v-model="form.total_due" readonly class="form-control"></th>
                      </tr>
                      <tr>
                        <th colspan="5" class="text-right">
                          <button type="button" class="btn btn-secondary"><i class="feather icon-x"></i> Cancel</button>
                          <button type="submit" class="btn btn-success"><i class="feather icon-printer"></i> Save</button>
                        </th>
                      </tr>
                    </tbody>
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
  import Layout from "../../Shared/Layout";
  import Model from "../../Components/Model";

  export default {
    name: "SaleCreate",
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
        editMode: false,
        modelTitle: 'Create New Sale',
        form: {
          id: '',
          invoice: '',
          total_price: '0.00',
          total_paid: '0.00',
          total_due: '0.00',
          company: null,
          client: null,
          driver_name: '',
          track_no: '',
          dl_no: '',
          sale_date: '',
          status: '',
          sale_details: []
        },
      }
    },
    methods: {
      calculateTotal: function (index) {
        const selectedRow = this.form.sale_details[index];
        if (selectedRow.quantity !== '') {
          const price = parseFloat(selectedRow.quantity) * parseFloat(selectedRow.price);
          selectedRow.total = parseFloat(price).toFixed(2);
          this.form.sale_details[index] = selectedRow;
        }else {
          alert('Quantity must not be empty!');
        }
      },
      cleanForm: function () {
        this.modelTitle = 'Create New Sale';
        this.editMode = false;
        Object.keys(this.errors).forEach((key, value) => {
          this.errors[key] = '';
        });
      },
      store: function () {
        const self = this;
        this.$inertia.post(this.route('sales.store'), {

        })
          .then(function () {
            if (Object.keys(self.errors).length === 0) {
              self.closeModel();
              self.cleanForm();
              self.$toast('Sale Created Successfully');
            }
          });
      },
      addNewItem: function () {
        const saleDetail = {
          product: null,
          quantity: '',
          price: '0.00',
          total: '0.00'
        };
        this.form.sale_details.push(saleDetail);
      },
      removeSaleItem: function (index) {
        this.form.sale_details.splice(index, 1);
      }
    },
    created() {
      this.addNewItem()
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
