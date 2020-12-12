<template>
  <layout name="Client">
    <!-- product type list start -->
    <section class="users-list-wrapper">
      <!-- product type section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive" v-if="clients.data.length > 0">
                <table
                  id="data-table"
                  class="table table-bordered display responsive nowrap mb-0"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">{{ __("S.N.") }}</th>
                      <th>{{ __("Name") }}</th>
                      <th>{{ __("Contact No.") }}</th>
                      <th>{{ __("Address") }}</th>
                      <th>{{ __("Created At") }}</th>
                      <th class="text-center">{{ __("Status") }}</th>
                      <th class="text-center">{{ __("Action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(client, index) in clients.data"
                      :key="client.id"
                    >
                      <th>{{ index + 1 }}</th>
                      <th>{{ client.name }}</th>
                      <th>{{ client.phone }}</th>
                      <th>{{ client.address }}</th>
                      <td>{{ client.default_date_time }}</td>
                      <td v-html="$options.filters.status(client.status)"></td>
                      <td class="text-center">
                        <a
                          @click.prevent="setData(client)"
                          href=""
                          class="text-info"
                          role="button"
                          ><i class="feather icon-edit"></i
                        ></a>
                        <inertia-link
                          :title="__('History')"
                          :href="
                            route('client-balances.history.show', client.id)
                          "
                          class="text-primary"
                          role="button"
                          ><i class="feather icon-eye"></i
                        ></inertia-link>
                        <a
                          @click.prevent="openBalanceModal(client)"
                          href=""
                          class="text-success"
                          role="button"
                          ><i class="feather icon-plus-circle"></i
                        ></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-1">
                <pagination v-if="clients" :links="clients.links"></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  :placeholder="__('Sale Date')"
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
      options: {
          format: 'DD-MM-YYYY h:mm A',
          useCurrent: false,
        } 
    };
  },
  methods: {
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
      this.balance.created_at = new Date()
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
  },
};
</script>

<style>
</style>
