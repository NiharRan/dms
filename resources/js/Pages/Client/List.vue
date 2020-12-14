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
  },
};
</script>

<style>
</style>