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
                    <label
                      >{{ __("Client")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <multi-select
                      v-model="sale.client"
                      :options="clients"
                      :class="[errors.client_id ? 'in-invalid' : '']"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="true"
                      label="name"
                      track-by="name"
                      :placeholder="__('Select Client')"
                    ></multi-select>

                    <span
                      v-if="errors.client_id"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.client_id[0] }}</strong>
                    </span>
                  </div>
                  <div class="col-md-6 col-12">
                    <label
                      >{{ __("Sale Date")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <date-picker
                      class="form-control"
                      :placeholder="__('Sale Date')"
                      v-model="sale.sale_date"
                    >
                    </date-picker>

                    <span
                      v-if="errors.sale_date"
                      class="invalid-feedback"
                      style="display: block"
                      role="alert"
                    >
                      <strong>{{ errors.sale_date[0] }}</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <label>{{ __("Products") }}</label>
                  <table class="table table-responsive-sm table-bordered">
                    <tbody>
                      <tr
                        v-for="(row, index) in sale.sale_details"
                        :key="index"
                      >
                        <td>
                          <div class="row">
                            <div class="col-md-4 col-12 my-1">
                              <input
                                type="text"
                                v-model="row.track_no"
                                class="form-control text-uppercase"
                                :placeholder="__('Track No.')"
                              />
                              <span
                                v-if="sale_details_errors[index]"
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  sale_details_errors[index].track_no
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-4 col-12 my-1">
                              <multi-select
                                v-model="row.stock"
                                :options="stocks"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="true"
                                @input="fetchProducts(row.stock)"
                                label="name"
                                track-by="name"
                                :placeholder="__('Select Stock')"
                              ></multi-select>
                              <span
                                v-if="sale_details_errors[index]"
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  sale_details_errors[index].stock
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-4 col-12 my-1">
                              <multi-select
                                v-model="row.product"
                                :options="products"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="true"
                                label="name"
                                track-by="name"
                                :placeholder="__('Select Product')"
                              ></multi-select>
                              <span
                                v-if="sale_details_errors[index]"
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  sale_details_errors[index].product
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-3 col-12 my-1">
                              <input
                                type="text"
                                readonly
                                class="form-control"
                                :value="[
                                  row.product ? row.product.quantity : '',
                                ]"
                                :placeholder="__('Available Stock')"
                              />
                            </div>
                            <div class="col-md-3 col-12 my-1">
                              <input
                                type="text"
                                v-model="row.quantity"
                                @keyup="calculateTotalWhenQuantityChange(index)"
                                class="form-control"
                                :placeholder="__('Product Quantity')"
                              />
                              <span
                                v-if="sale_details_errors[index]"
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  sale_details_errors[index].quantity
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-3 col-12 my-1">
                              <input
                                type="text"
                                v-model="row.price"
                                @keyup="calculateTotalWhenPriceChange(index)"
                                class="form-control"
                                :placeholder="__('Product Price')"
                              />
                              <span
                                v-if="sale_details_errors[index]"
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  sale_details_errors[index].price
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-3 col-12 my-1">
                              <input
                                type="text"
                                readonly
                                :value="
                                  parseFloat(row.price * row.quantity).toFixed(
                                    2
                                  )
                                "
                                class="form-control"
                                :placeholder="__('Total')"
                              />
                            </div>
                          </div>
                        </td>
                        <th>
                          <button
                            class="btn btn-outline-danger"
                            @click.prevent="removeSaleItem(index)"
                            type="button"
                          >
                            <i class="feather icon-trash"></i>
                          </button>
                        </th>
                      </tr>
                      <tr>
                        <th></th>
                        <th>
                          <button
                            @click.prevent="addNewItem"
                            class="btn btn-outline-success"
                          >
                            <i class="feather icon-plus"></i>
                          </button>
                        </th>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __("Total") }}</th>
                        <th>
                          <input
                            type="text"
                            v-model="sale.total_price"
                            readonly
                            class="form-control"
                            :placeholder="__('Total')"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __("Paid") }}</th>
                        <th>
                          <input
                            type="text"
                            v-model="sale.total_paid"
                            @keyup="calculateDue"
                            class="form-control"
                            :placeholder="__('Paid')"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __("Due") }}</th>
                        <th>
                          <input
                            type="text"
                            v-model="sale.total_due"
                            readonly
                            class="form-control"
                            :placeholder="__('Due')"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __('Reference Code') }}</th>
                        <td>
                          <input type="text" @change="fetchCommission" v-model="sale.reference_code" class="form-control" :placeholder="__('Reference Code')">
                        </td>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __('Commission') }}</th>
                        <td>
                          <input type="text" readonly v-model="sale.commission" class="form-control" :placeholder="__('Commission')">
                        </td>
                      </tr>
                      <tr>
                        <th colspan="2">
                          <div class="row">
                            <div class="col-2">
                              {{ __("Transaction Media") }}
                              <strong class="text-danger">*</strong>
                            </div>
                            <div class="col-4">
                              <multi-select
                                v-model="sale.transaction_media"
                                :options="transaction_medias"
                                label="name"
                                track-by="name"
                                :placeholder="__('Select Transaction Media')"
                              ></multi-select>
                              <span
                                v-if="errors.transaction_media_id"
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  errors.transaction_media_id[0]
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-6">
                              <input
                                type="text"
                                v-model="sale.description"
                                class="form-control"
                                :placeholder="__('Description')"
                              />
                            </div>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th colspan="2" class="text-right">
                          <inertia-link :href="route('sales.invoices.show', sale.invoice)" class="btn btn-primary">
                          <i class="feather icon-arrow-left"></i> {{ __("Back") }}
                        </inertia-link>
                          <button type="submit" class="btn btn-success">
                            <i class="feather icon-printer"></i>
                            {{ __("Update") }}
                          </button>
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
import axios from "axios";
import Layout from "../../Shared/Layout";
import Model from "../../Components/Model";

export default {
  name: "SaleEdit",
  components: { Model, Layout },
  props: {
    success: String,
    clients: Array,
    stocks: Array,
    transaction_medias: Array,
    company: Object,
    sale: Object,
    errors: Object,
  },
  data: function () {
    return {
      products: [],
      sale_details_errors: [],
      invalid: false,
    };
  },
  methods: {
    fetchCommission: function () {
      if (this.sale.reference_code != '') {
        console.log('.....');
      }
    },
    calculateTotalWhenQuantityChange: function (index) {
      const selectedRow = this.sale.sale_details[index];
      const selectedProduct = this.sale.sale_details[index].product;
      if (this.sale.sale_details[index].product) {
        this.sale.sale_details[index].product.quantity -= selectedRow.quantity;
      }
      if (selectedRow.price !== "") {
        let price = 0;
        if (selectedRow.quantity !== "") {
          price =
            parseFloat(selectedRow.quantity) * parseFloat(selectedRow.price);
        }
        selectedRow.amount = parseFloat(price).toFixed(2);
        this.sale.sale_details[index] = selectedRow;
      }
      this.calculateTotal();
    },
    calculateTotalWhenPriceChange: function (index) {
      const selectedRow = this.sale.sale_details[index];
      if (selectedRow.quantity !== "") {
        let price = 0;
        if (selectedRow.price !== "") {
          price =
            parseFloat(selectedRow.quantity) * parseFloat(selectedRow.price);
        }
        selectedRow.amount = parseFloat(price).toFixed(2);
        this.sale.sale_details[index] = selectedRow;
      } else {
        alert("Quantity must not be empty!");
      }
      this.calculateTotal();
    },
    calculateTotal: async function () {
      let total_price = await this.sale.sale_details.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
      this.sale.total_price = parseFloat(total_price).toFixed(2);
      let total_due =
        parseFloat(total_price) - parseFloat(this.sale.total_paid);
      this.sale.total_due = parseFloat(total_due).toFixed(2);
    },
    calculateDue: function () {
      if (this.sale.total_price !== "") {
        let total_due = 0;
        if (this.sale.total_paid !== "") {
          total_due =
            parseFloat(this.sale.total_price) -
            parseFloat(this.sale.total_paid);
        }
        this.sale.total_due = parseFloat(total_due).toFixed(2);
      }
    },
    update: async function () {
      let errors = this.isValid();
      if (!this.invalid) {
        let self = this;
        const transaction_media_id = this.sale.transaction_media
          ? this.sale.transaction_media.id
          : "";
        const client_id = this.sale.client ? this.sale.client.id : "";
        const stocks = await this.sale.sale_details.map((item) => {
          if (item.stock) return item.stock.id;
          return "";
        });
        const products = await this.sale.sale_details.map((item) => {
          if (item.product) return item.product.id;
          return "";
        });
        const tracks = await this.sale.sale_details.map((item) => {
          if (item.track_no) return item.track_no;
          return "";
        });
        const quantities = await this.sale.sale_details.map((item) => {
          return item.quantity;
        });
        const prices = await this.sale.sale_details.map((item) => {
          return item.price;
        });
        const totals = await this.sale.sale_details.map((item) => {
          return item.amount;
        });
        this.$inertia
          .put(this.route("sales.update", this.sale.id), {
            total_price: this.sale.total_price,
            total_due: this.sale.total_due,
            total_paid: this.sale.total_paid,
            transaction_media_id: transaction_media_id,
            client_id: client_id,
            company_id: this.company.id,
            sale_date: this.sale.sale_date,
            stocks: stocks,
            products: products,
            tracks: tracks,
            quantities: quantities,
            prices: prices,
            totals: totals,
          })
          .then(function () {
            if (Object.keys(self.errors).length === 0) {
              self.$toast("Sale Created Successfully");
            }
          });
      } else {
        this.sale_details_errors = errors;
        this.invalid = false;
      }
    },
    addNewItem: function () {
      const saleDetail = {
        product: null,
        quantity: "",
        price: "0.00",
        amount: "0.00",
        track_no: "",
      };
      this.sale.sale_details.push(saleDetail);
    },
    removeSaleItem: function (index) {
      const removedItem = this.sale.sale_details[index];

      if (this.sale.sale_details[index].product) {
        this.sale.sale_details[index].product.quantity -= removedItem.quantity;
      }

      this.sale.total_price -= removedItem.amount;
      this.sale.total_due -= removedItem.amount;
      this.sale.sale_details.splice(index, 1);
      this.calculateTotal();
      this.calculateDue();
    },
    fetchProducts: function (stock) {
      let self = this;
      axios.get(this.route("stocks.products", stock.id)).then(({ data }) => {
        self.products = data;
      });
    },
    isValid: function () {
      let errors = [];
      this.sale.sale_details.forEach((row, index) => {
        let error = {};
        if (row.stock === null) {
          this.invalid = true;
          error.stock = "Stock is required";
        }
        if (row.product === null) {
          this.invalid = true;
          error.product = "Product is required";
        }
        if (row.track_no === "") {
          this.invalid = true;
          error.track_no = "Track No. is required";
        }
        if (row.quantity === "") {
          this.invalid = true;
          error.quantity = "Product quantity is required";
        }
        if (row.price === "0.00" || row.price === "") {
          this.invalid = true;
          error.price = "Product price is required";
        }
        errors[index] = error;
      });
      return errors;
    },
  },
  created() {},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
