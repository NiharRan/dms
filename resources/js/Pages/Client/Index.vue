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
                <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
                  <thead>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th>Name</th>
                    <th>Contact No.</th>
                    <th>Address</th>
                    <th>Created At</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(client, index) in clients.data" :key="client.id">
                      <th>{{ index + 1 }}</th>
                      <th>{{ client.name }}</th>
                      <th>{{ client.phone }}</th>
                      <th>{{ client.address }}</th>
                      <td>{{ client.default_date_time }}</td>
                      <td v-html="$options.filters.status(client.status)"></td>
                      <td class="text-center">
                        <a @click.prevent="setData(client)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                        <a @click.prevent="remove(client)" href="" class="text-warning" role="button"><i class="feather icon-trash"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <model>
        <template v-slot:header>
          <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
          <button type="button" @click="cleanForm" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </template>

        <form @submit.prevent="storeOrUpdate">
          <div class="modal-body">
              <div class="form-group">
                <input type="text"
                       placeholder="Client Name"
                       class="form-control"
                        :class="[errors.name ? 'is-invalid' : '']"
                        v-model="form.name">
                <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.name[0] }}</strong>
                </span>
              </div>

            <div class="form-group">
              <input type="text"
                     placeholder="Contact No."
                     class="form-control"
                     :class="[errors.phone ? 'is-invalid' : '']"
                     v-model="form.phone">
              <span v-if="errors.phone" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.phone[0] }}</strong>
                </span>
            </div>

            <div class="form-group mb-0">
              <textarea class="form-control"
                        :class="[errors.address ? 'is-invalid' : '']"
                        v-model="form.address" rows="3"></textarea>
              <span v-if="errors.address" class="invalid-feedback" style="display: block;" role="alert">
                  <strong>{{ errors.address[0] }}</strong>
                </span>
            </div>

              <label class="float-left mt-2" v-if="editMode">
                <input type="checkbox" v-model="form.status" :checked="[form.status ? true : false]">
                {{ form.status ? 'Active' : 'Inactive'}}
              </label>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success waves-effect waves-light">{{ editMode ? 'Update' : 'Create' }}</button>
            <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">Cancel</button>
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
    export default {
        name: "Client",
        components: {Model, Layout},
        props: {
          success: String,
          clients: Object,
          errors: Object,
        },
        data: function () {
          return {
            editMode: false,
            modelTitle: 'Create New Client',
            form: {
              id: '',
              name: '',
              phone: '',
              address: '',
              status: '',
            }
          }
        },
        methods: {
          setData: function (data) {
            this.modelTitle = `Edit ${data.name}'s Information`;
            this.editMode = true;
            this.form.name = data.name;
            this.form.phone = data.phone;
            this.form.address = data.address;
            this.form.status = data.status;
            this.form.id = data.id;
            $("#default").modal('show');
          },
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = 'Create New Client';
            this.editMode = false;
            this.form.name = '';
            this.form.phone = '';
            this.form.address = '';
            this.form.id = '';
            this.form.status = '';
            Object.keys(this.errors).forEach((key, value) => {
              this.errors[key] = '';
            });
          },
          storeOrUpdate: function () {
            if (this.editMode) {
              this.update();
            }else {
              this.store();
            }
          },
          store: function () {
            let self = this;
            this.$inertia.post(this.route('clients.store'), {
              name: this.form.name,
              phone: this.form.phone,
              address: this.form.address,
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Client Created Successfully');
              }
            });
          },
          update: function () {
            let self = this;
            this.$inertia.post(this.route('clients.update', this.form.id), {
              name: this.form.name,
              phone: this.form.phone,
              address: this.form.address,
              status: this.form.status,
              _method: "put"
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Client Info Updated Successfully');
              }
            });
          },
          remove: async function (client) {
            if (await this.$confirm()) {
              this.$inertia.delete(this.route('clients.destroy',client.id));
              this.$toast(`${client.name } deleted successfully`);
            }
          }
        }
    }
</script>

<style>

</style>
