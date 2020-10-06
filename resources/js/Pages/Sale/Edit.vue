<template>
  <layout name="SaleEdit">
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
                  <div class="col-md-6 col-12">
                    <label>Client<strong class="text-danger">*</strong></label>
                    <multi-select
                      v-model="sale.client"
                      :options="clients"
                      :class="[errors.client_id ? 'in-invalid' : '' ]"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="true"
                      label="name"
                      track-by="name"
                      placeholder="Select Client"></multi-select>

                    <span v-if="errors.client_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.client_id[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <label>Sale Date<strong class="text-danger">*</strong></label>
                    <date-picker
                      class="form-control"
                      placeholder="Sale Date"
                      v-model="sale.sale_date">
                    </date-picker>

                    <span v-if="errors.sale_date" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.sale_date[0] }}</strong>
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
                      <tr v-for="(row, index) in sale.sale_details" :key="index">
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
                          <input type="text" v-model="row.quantity" @keyup="calculateTotalWhenQuantityChange(index)" class="form-control">
                        </th>
                        <th>
                          <input type="text" v-model="row.price" @keyup="calculateTotalWhenPriceChange(index)" class="form-control">
                        </th>
                        <th>
                          <input type="text" v-model="row.amount" readonly class="form-control">
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
                        <th><input type="text" v-model="sale.total_price" readonly class="form-control"></th>
                      </tr>
                      <tr>
                        <th colspan="4" class="text-right">Total Paid</th>
                        <th><input type="text" v-model="sale.total_paid" @keyup="calculateDue" class="form-control"></th>
                      </tr>
                      <tr>
                        <th colspan="4" class="text-right">Total Due</th>
                        <th><input type="text" v-model="sale.total_due" readonly class="form-control"></th>
                      </tr>
                      <tr>
                        <th colspan="5" class="text-right">
                          <button type="button" class="btn btn-secondary"><i class="feather icon-x"></i> Cancel</button>
                          <button type="submit" class="btn btn-success"><i class="feather icon-printer"></i> Update</button>
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
    name: "SaleEdit",
    components: {Model, Layout},
    props: {
      success: String,
      clients: Array,
      products: Array,
      company: Object,
      sale: Object,
      errors: Object,
    },
    data: function () {
      return {

      }
    },
    methods: {
      calculateTotalWhenQuantityChange: function (index) {
        const selectedRow = this.sale.sale_details[index];
        if (selectedRow.price !== '') {
          let price = 0;
          if (selectedRow.quantity !== '') {
            price = parseFloat(selectedRow.quantity) * parseFloat(selectedRow.price);
          }
          selectedRow.amount = parseFloat(price).toFixed(2);
          this.sale.sale_details[index] = selectedRow;
        }
        this.calculateTotal();
      },
      calculateTotalWhenPriceChange: function (index) {
        const selectedRow = this.sale.sale_details[index];
        if (selectedRow.quantity !== '') {
          let price = 0;
          if (selectedRow.price !== '') {
            price = parseFloat(selectedRow.quantity) * parseFloat(selectedRow.price);
          }
          selectedRow.amount = parseFloat(price).toFixed(2);
          this.sale.sale_details[index] = selectedRow;
        }else {
          alert('Quantity must not be empty!');
        }
        this.calculateTotal();
      },
      calculateTotal: async function () {
        let total_price = await this.sale.sale_details.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        this.sale.total_price = parseFloat(total_price).toFixed(2);
        let total_due = parseFloat(total_price) - parseFloat(this.sale.total_paid);
        this.sale.total_due = parseFloat(total_due).toFixed(2);
      },
      calculateDue: function () {
        if (this.sale.total_price !== '') {
          let total_due = 0;
          if (this.sale.total_paid !== '') {
            total_due = parseFloat(this.sale.total_price) - parseFloat(this.sale.total_paid);
          }
          this.sale.total_due = parseFloat(total_due).toFixed(2);
        }
      },
      update: async function () {
        const self = this;
        const client_id = this.sale.client ? this.sale.client.id : '';
        const products = await this.sale.sale_details.map(item => {
          if(item.product) return item.product.id
          return '';
        });
        const quantities = await this.sale.sale_details.map(item => {
          return item.quantity;
        });
        const prices = await this.sale.sale_details.map(item => {
          return item.price;
        });
        const totals = await this.sale.sale_details.map(item => {
          return item.amount;
        });
        this.$inertia.put(this.route('sales.update', this.sale.id), {
          total_price: this.sale.total_price,
          total_due: this.sale.total_due,
          total_paid: this.sale.total_paid,
          client_id: client_id,
          company_id: this.company.id,
          sale_date: this.sale.sale_date,
          products: products,
          quantities: quantities,
          prices: prices,
          totals: totals,
        })
          .then(function () {
            if (Object.keys(self.errors).length === 0) {
              self.$toast('Sale Created Successfully');
            }
          });
      },
      addNewItem: function () {
        const saleDetail = {
          product: null,
          quantity: '',
          price: '0.00',
          amount: '0.00'
        };
        this.sale.sale_details.push(saleDetail);
      },
      removeSaleItem: function (index) {
        const removedItem =  this.sale.sale_details[index];
        this.sale.total_price -= removedItem.amount;
        this.sale.total_due -= removedItem.amount;
        this.sale.sale_details.splice(index, 1);
      }
    },
    created() {

    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
