<template>
  <layout name="Client">
    <!-- product type list start -->
    <section class="users-list-wrapper">
      <!-- product type section start -->
      <section
        id="wishlist"
        class="grid-view wishlist-items"
        v-if="clients.data.length > 0"
      >
        <div
          class="card ecommerce-card"
          v-for="(client, key) in clients.data"
          :key="key"
        >
          <div class="card-content">
            <div class="card-header">
              <div class="">
                <p class="card-title">{{ client.name }}</p>
                <p>
                  <i
                    class="h6 feather icon-file-text font-weight-bold"
                    v-if="client.address"
                  ></i
                  ><span class="h6">{{ client.address }}</span>
                  <i
                    class="h6 feather icon-phone font-weight-bold"
                    v-if="client.phone"
                  ></i
                  ><span class="h6">{{ client.phone }}</span>
                </p>
              </div>
              <div>
                <a
                  @click.prevent="setData(client)"
                  href=""
                  class="btn btn-info"
                  role="button"
                  ><i class="feather icon-edit"></i>
                  {{ __("Edit") }}
                </a>
                <inertia-link
                  :title="__('History')"
                  :href="route('client-balances.history.show', client.id)"
                  class="btn btn-primary"
                  role="button"
                  ><i class="feather icon-eye"></i>
                  {{ __("History") }}
                </inertia-link>
                <a
                  @click.prevent="openBalanceModal(client)"
                  href=""
                  class="btn btn-success"
                  role="button"
                  ><i class="feather icon-plus-circle"></i>
                  {{ __("Add Balance") }}
                </a>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center">{{ __("S.N.") }}</th>
                      <th class="text-center">{{ __("Invoice") }}</th>
                      <th class="text-center">{{ __("Date") }}</th>
                      <th class="text-right">{{ __("Commission") }}</th>
                      <th class="text-right">{{ __("Total Amount") }}</th>
                      <th class="text-right">{{ __("Paid") }}</th>
                      <th class="text-right">{{ __("Due") }}</th>
                      <th class="text-center">{{ __("Action") }}</th>
                    </tr>
                  </thead>
                  <tbody v-if="client.sales && client.sales.length > 0">
                    <tr>
                      <th colspan="6" class="text-right">{{ __("Total") }}</th>
                      <th class="bg-warning text-right text-white">
                        {{ totalDue(client.sales) }}
                      </th>
                      <td></td>
                    </tr>
                    <tr v-for="(sale, k) in client.sales" :key="k">
                      <th>{{ k + 1 }}</th>
                      <th>{{ sale.invoice }}</th>
                      <td>
                        {{ sale.sale_date | moment("DD-MM-YYYY hh:mm A") }}
                      </td>
                      <td class="text-right">
                        {{ parseFloat(sale.commission).toFixed(3) }}
                      </td>
                      <td class="text-right">
                        {{ parseFloat(sale.total_price).toFixed(3) }}
                      </td>
                      <td class="text-right">
                        {{ parseFloat(sale.total_paid).toFixed(3) }}
                      </td>
                      <td class="text-right">
                        {{ parseFloat(sale.total_due).toFixed(3) }}
                      </td>
                      <td>
                        <a
                          v-if="sale.status === 0"
                          @click.prevent="setPaymentData(sale)"
                          class="btn btn-success text-white"
                          role="button"
                        >
                          <i class="feather icon-file"></i>
                          {{ __("Due Payment") }}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <model>
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
              <input
                type="text"
                :placeholder="__('Client Name')"
                class="form-control text-uppercase"
                :class="[errors.name ? 'is-invalid' : '']"
                v-model="form.name"
              />
              <span
                v-if="errors.name"
                class="invalid-feedback"
                style="display: block"
                role="alert"
              >
                <strong>{{ errors.name[0] }}</strong>
              </span>
            </div>

            <div class="row form-group">
              <div
                class="col-sm-12"
                :class="[editMode ? 'col-md-12' : 'col-md-6']"
              >
                <input
                  type="text"
                  :placeholder="__('Contact No.')"
                  class="form-control"
                  minlength="11"
                  maxlength="11"
                  :class="[errors.phone ? 'is-invalid' : '']"
                  v-model="form.phone"
                />
                <span
                  v-if="errors.phone"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.phone[0] }}</strong>
                </span>
              </div>
              <div class="col-md-6 col-sm-12" v-if="!editMode">
                <input
                  type="number"
                  step="2"
                  :placeholder="__('Opening Balance')"
                  class="form-control"
                  :class="[errors.balance ? 'is-invalid' : '']"
                  v-model="form.balance"
                  :readonly="$page.auth.is_operator ? true : false"
                />
                <span
                  v-if="errors.balance"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.balance[0] }}</strong>
                </span>
              </div>
            </div>

            <div class="form-group mb-0">
              <textarea
                class="form-control text-uppercase"
                :class="[errors.address ? 'is-invalid' : '']"
                v-model="form.address"
                rows="3"
              ></textarea>
              <span
                v-if="errors.address"
                class="invalid-feedback"
                style="display: block"
                role="alert"
              >
                <strong>{{ errors.address[0] }}</strong>
              </span>
            </div>

            <label class="float-left mt-2" v-if="editMode">
              <input
                type="checkbox"
                v-model="form.status"
                :checked="[form.status ? true : false]"
              />
              {{ form.status ? __("Active") : __("Inactive") }}
            </label>
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
      <model :modelId="'balance'">
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">Store Balance Info</h4>
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

        <form @submit.prevent="storeBalanceInfo">
          <div class="modal-body">
            <div class="form-group row">
              <div class="col-md-6 col-sm-12">
                <input
                  type="number"
                  step="2"
                  :placeholder="__('Balance')"
                  class="form-control"
                  :class="[errors.amount ? 'is-invalid' : '']"
                  v-model="balance.amount"
                />
                <span
                  v-if="errors.amount"
                  class="invalid-feedback"
                  style="display: block"
                  role="alert"
                >
                  <strong>{{ errors.amount[0] }}</strong>
                </span>
              </div>
              <div class="col-md-6 col-sm-12">
                <date-picker
                  class="form-control"
                  :placeholder="__('Date')"
                  v-model="balance.created_at"
                  :config="options"
                >
                </date-picker>
              </div>
            </div>

            <div class="form-group mb-0">
              <textarea
                class="form-control text-uppercase"
                :class="[errors.description ? 'is-invalid' : '']"
                v-model="balance.description"
                rows="3"
              ></textarea>
              <span
                v-if="errors.description"
                class="invalid-feedback"
                style="display: block"
                role="alert"
              >
                <strong>{{ errors.description[0] }}</strong>
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-success waves-effect waves-light"
            >
              {{ __("Store") }}
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
      <model :modelId="'payment'">
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
          <button
            type="button"
            @click="cleanPaymentForm"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </template>

        <form @submit.prevent="payment">
          <div class="modal-body">
            <div class="alert alert-danger" v-if="error && error.length > 0">
              {{ error }}
            </div>
            <div class="form-group">
              <label>{{ __("Total Amount") }}</label>
              <input
                type="text"
                :placeholder="__('Total Amount')"
                class="form-control"
                readonly
                v-model="sale.total_price"
              />
            </div>
            <div class="form-group">
              <label>{{ __("Paid") }}</label>
              <input
                type="text"
                :placeholder="__('Paid')"
                class="form-control"
                readonly
                v-model="sale.total_paid"
              />
            </div>
            <div class="form-group">
              <label>{{ __("Due") }}</label>
              <input
                type="text"
                :placeholder="__('Due')"
                class="form-control"
                readonly
                v-model="sale.total_due"
              />
            </div>
            <div class="form-group mb-0">
              <label>{{ __("Amount") }}</label>
              <input
                type="text"
                :placeholder="__('Amount')"
                class="form-control"
                :class="[errors.amount ? 'is-invalid' : '']"
                v-model="sale.amount"
              />
              <span
                v-if="errors.amount"
                class="invalid-feedback"
                style="display: block"
                role="alert"
              >
                <strong>{{ errors.amount[0] }}</strong>
              </span>
            </div>
            <label class="float-left mt-2">
              <input type="checkbox" v-model="sale.payment_from_balance" />
              {{ __("Payment From Balance") }}
            </label>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-success waves-effect waves-light"
            >
              {{ __("Update") }}
            </button>
            <button
              type="button"
              @click="cleanPaymentForm"
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
    <!-- product type list ends -->
  </layout>
</template>

<script>
import Layout from "../../Shared/Layout";
import Model from "../../Components/Model";
import Pagination from "../../Shared/Pagination";
export default {
  name: "Client",
  components: { Model, Layout, Pagination },
  props: {
    success: String,
    clients: Object,
    errors: Object,
    error: String,
  },
  data: function () {
    return {
      editMode: false,
      modelTitle: this.__("Create New Client"),
      form: {
        id: "",
        name: "",
        phone: "",
        address: "",
        status: "",
      },
      balance: {
        id: "",
        description: "",
        amount: "",
        created_at: new Date(),
      },
      sale: {
        total_price: "",
        total_paid: "",
        total_due: "",
        invoice: "",
        payment_from_balance: false,
        client_id: 0,
      },
      options: {
        format: "DD-MM-YYYY h:mm A",
        useCurrent: false,
      },
    };
  },
  methods: {
    totalDue: function (data) {
      let duePrice = data.reduce((due, sale) => {
        let p = sale.total_due == "" ? 0 : sale.total_due;
        return due + parseFloat(p);
      }, 0);
      return parseFloat(duePrice).toFixed(3);
    },
    setData: function (data) {
      this.modelTitle = `Edit ${data.name}'s Information`;
      this.editMode = true;
      this.form.name = data.name;
      this.form.phone = data.phone;
      this.form.address = data.address;
      this.form.balance = data.balance;
      this.form.status = data.status;
      this.form.id = data.id;
      $("#default").modal("show");
    },
    openBalanceModal: function (data) {
      this.balance.client_id = data.id;
      $("#balance").modal("show");
    },
    closeModel: function () {
      $("#default").modal("hide");
      $("#balance").modal("hide");
      $("#payment").modal("hide");
    },
    cleanForm: function () {
      this.modelTitle = this.__("Create New Client");
      this.editMode = false;
      this.form.name = "";
      this.form.phone = "";
      this.form.address = "";
      this.form.balance = "";
      this.form.id = "";
      this.form.status = "";

      this.balance.client_id = "";
      this.balance.amount = "";
      this.balance.description = "";
      this.balance.description = "";
      this.balance.created_at = new Date();
    },
    storeOrUpdate: function () {
      if (this.editMode) {
        this.update();
      } else {
        this.store();
      }
    },
    store: function () {
      let self = this;
      this.$inertia
        .post(this.route("clients.store"), {
          name: this.form.name,
          phone: this.form.phone,
          address: this.form.address,
          balance: this.form.balance,
        })
        .then(function () {
          if (Object.keys(self.errors).length === 0) {
            self.closeModel();
            self.cleanForm();
            self.$toast("Client Created Successfully");
          }
        });
    },
    update: function () {
      let self = this;
      this.$inertia
        .post(this.route("clients.update", this.form.id), {
          name: this.form.name,
          phone: this.form.phone,
          address: this.form.address,
          status: this.form.status,
          _method: "put",
        })
        .then(function () {
          if (Object.keys(self.errors).length === 0) {
            self.closeModel();
            self.cleanForm();
            self.$toast("Client Info Updated Successfully");
          }
        });
    },
    storeBalanceInfo: function () {
      let self = this;
      this.$inertia
        .post(this.route("client-balances.history.store"), {
          client_id: this.balance.client_id,
          amount: this.balance.amount,
          description: this.balance.description,
          created_at: this.balance.created_at,
        })
        .then(function () {
          if (Object.keys(self.errors).length === 0) {
            self.closeModel();
            self.cleanForm();
            self.$toast("Client Balance Updated Successfully");
          }
        });
    },
    cleanPaymentForm: function () {
      $("#payment").modal("hide");
      this.sale.total_price = "";
      this.sale.total_paid = "";
      this.sale.total_due = "";
      this.sale.amount = "";
      this.sale.invoice = "";
      this.sale.payment_from_balance = false;
      this.sale.client_id = 0;
    },
    payment: function () {
      let self = this;
      this.$inertia
        .post(this.route("sales.invoices.pay", this.sale.invoice), {
          amount: this.sale.amount,
          payment_from_balance: this.sale.payment_from_balance,
          client_id: this.sale.client_id,
        })
        .then(function (response) {
          if (Object.keys(self.errors).length === 0 && !this.error) {
            self.cleanPaymentForm();
          }
        });
    },
    setPaymentData: function (data) {
      this.modelTitle = this.__("Update Due Amount");
      $("#payment").modal("show");
      this.sale.total_price = data.total_price;
      this.sale.total_paid = data.total_paid;
      this.sale.total_due = data.total_due;
      this.sale.invoice = data.invoice;
      this.sale.client_id = data.client_id;
    },
  },
};
</script>

<style>
</style>
