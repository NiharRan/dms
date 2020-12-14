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

              <form @submit.prevent="store">
                <div class="form-group row">
                  <div class="col-md-6 col-12">
                    <label
                      >{{ __("Client")
                      }}<strong class="text-danger">*</strong></label
                    >
                    <multi-select
                      v-model="form.client"
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
                      v-model="form.sale_date"
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
                        v-for="(row, index) in form.sale_details"
                        :key="index"
                      >
                        <td>
                          <div class="row">
                            <div class="col-md-6 col-12 my-1">
                              <input
                                type="text"
                                v-model="row.track_no"
                                class="form-control text-uppercase"
                                :class="[
                                  sale_details_errors[index] &&
                                  sale_details_errors[index].track_no
                                    ? 'is-invalid'
                                    : '',
                                ]"
                                :placeholder="__('Track No.')"
                              />
                              <span
                                v-if="
                                  sale_details_errors[index] &&
                                  sale_details_errors[index].track_no
                                "
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong>{{
                                  sale_details_errors[index].track_no
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-6 col-12 my-1">
                              <multi-select
                                v-model="row.product"
                                :options="products"
                                :searchable="true"
                                :class="[
                                  sale_details_errors[index] &&
                                  sale_details_errors[index].product
                                    ? 'is-invalid'
                                    : '',
                                ]"
                                :close-on-select="true"
                                :show-labels="true"
                                label="name"
                                track-by="name"
                                :placeholder="__('Select Product')"
                              ></multi-select>
                              <span
                                v-if="
                                  sale_details_errors[index] &&
                                  sale_details_errors[index].product
                                "
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
                                @change="checkStock(index)"
                                class="form-control"
                                :class="[
                                  (sale_details_errors[index] &&
                                    sale_details_errors[index].quantity) ||
                                  row.stock_alert != ''
                                    ? 'is-invalid'
                                    : '',
                                ]"
                                :placeholder="__('Product Quantity')"
                              />
                              <span
                                v-if="
                                  (sale_details_errors[index] &&
                                    sale_details_errors[index].quantity) ||
                                  row.stock_alert != ''
                                "
                                class="invalid-feedback"
                                style="display: block"
                                role="alert"
                              >
                                <strong
                                  v-if="
                                    sale_details_errors[index] &&
                                    sale_details_errors[index].quantity
                                  "
                                  >{{
                                    sale_details_errors[index].quantity
                                  }}</strong
                                >
                                <strong v-if="row.stock_alert != ''">{{
                                  row.stock_alert
                                }}</strong>
                              </span>
                            </div>
                            <div class="col-md-3 col-12 my-1">
                              <input
                                type="text"
                                v-model="row.price"
                                @keyup="calculateTotalWhenPriceChange(index)"
                                class="form-control"
                                :class="[
                                  sale_details_errors[index] &&
                                  sale_details_errors[index].price
                                    ? 'is-invalid'
                                    : '',
                                ]"
                                :placeholder="__('Product Price')"
                              />
                              <span
                                v-if="
                                  sale_details_errors[index] &&
                                  sale_details_errors[index].price
                                "
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
                                v-model="row.total"
                                readonly
                                class="form-control"
                                :placeholder="__('Total')"
                              />
                            </div>
                          </div>
                        </td>
                        <th width="15%">
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
                            v-model="form.total_price"
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
                            v-model="form.total_paid"
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
                            v-model="form.total_due"
                            readonly
                            class="form-control"
                            :placeholder="__('Due')"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __("Reference Code") }}</th>
                        <td>
                          <input
                            type="text"
                            @change="fetchCommission"
                            v-model="form.reference"
                            class="form-control"
                            :placeholder="__('Reference Code')"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th class="text-right">{{ __("Commission") }}</th>
                        <td>
                          <input
                            type="text"
                            readonly
                            v-model="form.commission"
                            class="form-control"
                            :placeholder="__('Commission')"
                          />
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
                                v-model="form.transaction_media"
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
                                v-model="form.description"
                                class="form-control text-uppercase"
                                :placeholder="__('Description')"
                              />
                            </div>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th colspan="2" class="text-right">
                          <inertia-link
                            :href="route('sales.index')"
                            class="btn btn-primary"
                          >
                            <i class="feather icon-arrow-left"></i>
                            {{ __("Back") }}
                          </inertia-link>
                          <button type="submit" class="btn btn-success">
                            <i class="feather icon-printer"></i>
                            {{ __("Store") }}
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
  name: "SaleCreate",
  components: { Model, Layout },
  props: {
    success: String,
    clients: Array,
    transaction_medias: Array,
    products: Array,
    company: Object,
    errors: Object,
  },
  data: function () {
    return {
      form: {
        id: "",
        total_price: "0.00",
        total_paid: "",
        total_due: "0.00",
        company: null,
        transaction_media: null,
        client: null,
        sale_date: new Date(),
        sale_details: [],
        reference: "",
        commission: "0.00",
      },
      sale_details_errors: [],
      invalid: false,
      invalid_stock: false,
    };
  },
  methods: {
    fetchCommission: function () {
      if (this.form.reference != "") {
        axios
          .get(this.route("drivers.invoices.commissions", this.form.reference))
          .then(({ data }) => {
            this.form.commission =
              data.commission == ""
                ? 0.0
                : parseFloat(data.commission).toFixed(3);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkStock: async function (index) {
      const selectedRow = this.form.sale_details[index];
      let selectedProduct = selectedRow.product;
      let stock = await this.form.sale_details.reduce((sum, saleDetail) => {
        saleDetail.product && saleDetail.product.id == selectedProduct.id
          ? (sum += parseFloat(saleDetail.quantity))
          : false;
        return sum;
      }, 0);
      let totalStock = selectedRow.product.quantity;
      let dif = totalStock - stock;
      if (dif < 0) {
        this.invalid_stock = true;
        this.form.sale_details[
          index
        ].stock_alert = `${totalStock} - ${stock} = ${dif}`;
      } else {
        this.invalid_stock = false;
        this.form.sale_details[index].stock_alert = "";
      }
    },
    calculateTotalWhenQuantityChange: function (index) {
      const selectedRow = this.form.sale_details[index];

      let price = selectedRow.price == "" ? "0.00" : selectedRow.price;
      let quantity = selectedRow.quantity == "" ? "0.00" : selectedRow.quantity;

      let total = parseFloat(price) * parseFloat(quantity);
      selectedRow.total = parseFloat(total).toFixed(3);
      this.form.sale_details[index] = selectedRow;
      this.calculateTotal();
    },
    calculateTotalWhenPriceChange: function (index) {
      const selectedRow = this.form.sale_details[index];

      let price = selectedRow.price == "" ? "0.00" : selectedRow.price;
      let quantity = selectedRow.quantity == "" ? "0.00" : selectedRow.quantity;

      let total = parseFloat(price) * parseFloat(quantity);
      selectedRow.total = parseFloat(total).toFixed(3);
      this.form.sale_details[index] = selectedRow;

      this.calculateTotal();
    },
    calculateTotal: async function () {
      let total_price = await this.form.sale_details.reduce(
        (sum, item) => sum + parseFloat(item.total),
        0
      );
      this.form.total_price = parseFloat(total_price).toFixed(3);
      this.calculateDue();
    },
    calculateDue: function () {
      let total_price =
        this.form.total_price == "" ? "0.00" : this.form.total_price;
      let total_paid =
        this.form.total_paid == "" ? "0.00" : this.form.total_paid;
      let total_due = parseFloat(total_price) - parseFloat(total_paid);
      this.form.total_due = parseFloat(total_due).toFixed(3);
    },
    cleanForm: function () {
      Object.keys(this.errors).forEach((key, value) => {
        this.errors[key] = "";
      });
    },
    store: async function () {
      let errors = this.isValid();
      if (!this.invalid && !this.invalid_stock) {
        let self = this;
        const transaction_media_id = this.form.transaction_media
          ? this.form.transaction_media.id
          : "";
        const client_id = this.form.client ? this.form.client.id : "";
        const products = await this.form.sale_details.map((item) => {
          if (item.product) return item.product.id;
          return "";
        });
        const tracks = await this.form.sale_details.map((item) => {
          if (item.track_no) return item.track_no;
          return "";
        });
        const quantities = await this.form.sale_details.map((item) => {
          return item.quantity;
        });
        const prices = await this.form.sale_details.map((item) => {
          return item.price;
        });
        const totals = await this.form.sale_details.map((item) => {
          return item.total;
        });
        this.$inertia
          .post(this.route("sales.store"), {
            total_price: this.form.total_price,
            total_due: this.form.total_due,
            total_paid: this.form.total_paid,
            description: this.form.description,
            client_id: client_id,
            transaction_media_id: transaction_media_id,
            company_id: this.company.id,
            sale_date: this.form.sale_date,
            commission: this.form.commission,
            reference: this.form.reference,
            products: products,
            tracks: tracks,
            quantities: quantities,
            prices: prices,
            totals: totals,
          })
          .then(function () {
            if (Object.keys(self.errors).length === 0) {
              self.cleanForm();
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
        price: "",
        total: "0.00",
        track_no: "",
        stock_alert: "",
      };
      this.form.sale_details.push(saleDetail);
    },
    removeSaleItem: function (index) {
      const removedItem = this.form.sale_details[index];

      const selectedProduct = this.form.sale_details[index].product;
      if (selectedProduct) {
        selectedProduct.quantity += selectedRow.quantity;
      }

      this.form.total_price -= removedItem.total;
      this.form.total_due -= removedItem.total;
      this.form.sale_details.splice(index, 1);
      this.calculateTotal();
      this.calculateDue();
    },
    isValid: function () {
      let errors = [];
      this.form.sale_details.forEach((row, index) => {
        let error = {};
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
  created() {
    this.addNewItem();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
