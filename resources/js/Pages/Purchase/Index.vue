<template>
  <layout name="PurchaseIndex">
    <!-- users list start -->
    <section class="users-list-wrapper">
      <!-- Ag Grid users list section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive">
                <table
                  id="data-table"
                  class="table table-bordered display responsive nowrap mb-0"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th>{{ __("Stock") }}</th>
                      <th>{{ __("Product") }}</th>
                      <th class="text-center">{{ __("Quantity") }}</th>
                      <th class="text-center">{{ __("Status") }}</th>
                      <th class="text-center">{{ __("Action") }}</th>
                    </tr>
                  </thead>
                  <tbody v-if="stock_details.data.length > 0">
                    <tr
                      v-for="(stock_detail, index) in stock_details.data"
                      :key="stock_detail.id"
                    >
                      <th>{{ index + 1 }}</th>
                      <th>{{ stock_detail.stock.name }}</th>
                      <th>{{ stock_detail.product.name }}</th>
                      <th class="text-center">
                        {{ parseFloat(stock_detail.quantity).toFixed(3) }}
                      </th>
                      <td class="text-center"
                        v-html="$options.filters.status(stock_detail.status)"
                      ></td>
                      <td class="text-center">
                        <a
                          @click.prevent="setData(stock_detail)"
                          :title="__('Edit')"
                          href=""
                          class="text-primary"
                          role="button"
                          ><i class="feather icon-edit"></i
                        ></a>
                        <inertia-link
                          :title="__('History')"
                          :href="
                            route('stock-details.history.show', stock_detail.id)
                          "
                          class="text-info"
                          role="button"
                          ><i class="feather icon-eye"></i
                        ></inertia-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-1">
                <pagination
                  v-if="stock_details"
                  :links="stock_details.meta.links"
                ></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <model :size="!editMode ? 'modal-lg' : ''">
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
          <button
            type="button"
            @click="cleanForm"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </template>

        <form @submit.prevent="storeOrUpdate">
          <div class="modal-body">
            <div class="form-group">
              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-6 col-12" v-if="!editMode">
                <label>{{ __("Stock") }}</label>
                <multi-select
                  v-model="form.stock"
                  :options="stocks"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="true"
                  label="name"
                  track-by="name"
                  :placeholder="__('Select Stock')"
                ></multi-select>
                <span
                  v-if="errors.stock_id"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.stock_id[0] }}</strong>
                </span>
              </div>
              <div class="col-md-6 col-12" v-if="!editMode">
                <label>{{ __("Product") }}</label>
                <multi-select
                  v-model="form.product"
                  :options="products"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="true"
                  label="name"
                  track-by="name"
                  :placeholder="__('Select Product')"
                ></multi-select>
                <span
                  v-if="errors.product_id"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.product_id[0] }}</strong>
                </span>
              </div>
            </div>

            <div class="form-group row mb-0">
              <div class="col-md-4 col-12" v-if="!editMode">
                <label>{{ __("Quantity") }}</label>
                <input
                  type="text"
                  v-model="form.quantity"
                  class="form-control"
                  :placeholder="__('Quantity')"
                />
                <span
                  v-if="errors.quantity"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.quantity[0] }}</strong>
                </span>
              </div>
              <div class="col-md-4 col-12">
                <label>{{ __("Ship") }}</label>
                <input
                  type="text"
                  v-model="form.ship"
                  class="form-control text-uppercase"
                  :placeholder="__('Ship')"
                />
                <span
                  v-if="errors.ship"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.ship[0] }}</strong>
                </span>
              </div>
              <div class="col-md-4 col-12">
                <label>{{ __("Company") }}</label>
                <input
                  type="text"
                  v-model="form.company"
                  class="form-control text-uppercase"
                  :placeholder="__('Company')"
                />
                <span
                  v-if="errors.company"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.company[0] }}</strong>
                </span>
              </div>

              <div class="col-12" v-if="editMode">
                <label>{{ __("Staus") }}</label>
                <select class="form-control" v-model="form.status">
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-success waves-effect waves-light"
            >
              {{ editMode ? __("Update") : __("Create") }}
            </button>
            <button
              type="button"
              @click="cleanForm"
              class="btn"
              data-dismiss="modal"
            >
              {{ __("Cancel") }}
            </button>
          </div>
        </form>
      </model>
      <!-- Ag Grid users list section end -->
    </section>
    <!-- users list ends -->
  </layout>
</template>

<script>
import Layout from "../../Shared/Layout";
import Model from "../../Components/Model";
import Pagination from "../../Shared/Pagination";
export default {
  name: "PurchaseIndex",
  components: { Model, Layout, Pagination },
  props: {
    success: String,
    error: String,
    stock_details: Object,
    stocks: Array,
    products: Array,
    errors: Object,
  },
  data: function () {
    return {
      editMode: false,
      modelTitle: this.__("Purchase Product"),
      form: {
        id: "",
        stock: null,
        product: null,
        ship: "",
        company: "",
        status: "",
      },
    };
  },
  methods: {
    setData: function (data) {
      this.modelTitle = `Update Stock Status`;
      this.editMode = true;
      this.form.stock = data.stock;
      this.form.product = data.product;
      this.form.ship = data.ship;
      this.form.company = data.company;
      this.form.quantity = data.quantity;
      this.form.status = data.status;
      this.form.id = data.id;
      $("#default").modal("show");
    },
    closeModel: function () {
      $("#default").modal("hide");
    },
    cleanForm: function () {
      this.modelTitle = this.__("Purchase Product");
      this.editMode = false;
      this.form.stock = null;
      this.form.product = null;
      this.form.ship = "";
      this.form.company = "";
      this.form.quantity = "";
      this.form.id = "";
      this.form.status = "";
      Object.keys(this.errors).forEach((key, value) => {
        this.errors[key] = "";
      });
    },
    storeOrUpdate: function () {
      if (this.editMode) {
        this.update();
      } else {
        this.store();
      }
    },
    store: function () {
      let stock_id = this.form.stock === null ? "" : this.form.stock.id;
      let product_id = this.form.product === null ? "" : this.form.product.id;
      let self = this;
      this.$inertia
        .post(this.route("stock-details.store"), {
          stock_id: stock_id,
          product_id: product_id,
          ship: this.form.ship,
          company: this.form.company,
          quantity: this.form.quantity,
        })
        .then(function () {
          if (self.error === null && Object.keys(self.errors).length === 0) {
            self.closeModel();
            self.cleanForm();
            self.$toast("Role Created Successfully");
          }
        });
    },
    update: function () {
      let stock_id = this.form.stock === null ? "" : this.form.stock.id;
      let self = this;
      this.$inertia
        .post(this.route("stock-details.update", this.form.id), {
          stock_id: stock_id,
          ship: this.form.ship,
          company: this.form.company,
          status: this.form.status,
          _method: "put",
        })
        .then(function () {
          if (Object.keys(self.errors).length === 0) {
            self.closeModel();
            self.cleanForm();
            self.$toast("Stock Updated Successfully");
          }
        });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
