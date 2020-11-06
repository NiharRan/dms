<template>
  <layout name="Load">
    <!-- Load list start -->
    <section class="users-list-wrapper">
      <!-- Load section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive" v-if="loads.data.length > 0">
                <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
                  <thead>
                  <tr>
                    <th scope="col">{{__("S.N.")}}</th>
                    <th class="text-right">{{__("Amount")}}</th>
                    <th>{{__("Created At")}}</th>
                    <th class="text-center">{{__("Status")}}</th>
                    <th class="text-center">{{__("Action")}}</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(load, index) in loads.data" :key="load.id">
                      <th>{{ index + 1 }}</th>
                      <th class="text-right">{{ load.amount }}</th>
                      <td>{{ load.default_date_time }}</td>
                      <td v-html="$options.filters.status(load.status)"></td>
                      <td class="text-center">
                        <a @click.prevent="setData(load)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
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
              <div class="form-group mb-0">
                <input type="text"
                       placeholder="Load Amount"
                       class="form-control"
                        :class="[errors.amount ? 'is-invalid' : '']"
                        v-model="form.amount">
              </div>
              <span v-if="errors.amount" class="invalid-feedback" style="display: block;" role="alert">
                <strong>{{ errors.amount[0] }}</strong>
              </span>

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
    <!-- Load list ends -->
  </layout>
</template>

<script>
    import Layout from "../../Shared/Layout";
    import Model from "../../Components/Model";
    export default {
        name: "Load",
        components: {Model, Layout},
        props: {
          success: String,
          loads: Object,
          errors: Object,
        },
        data: function () {
          return {
            editMode: false,
            modelTitle: 'Create New Load',
            form: {
              id: '',
              name: '',
              status: '',
            }
          }
        },
        methods: {
          setData: function (data) {
            this.modelTitle = `Edit ${data.amount}'s Information`;
            this.editMode = true;
            this.form.amount = data.amount;
            this.form.status = data.status;
            this.form.id = data.id;
            $("#default").modal('show');
          },
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = 'Create New Load';
            this.editMode = false;
            this.form.amount = '';
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
            this.$inertia.post(this.route('loads.store'), {
              amount: this.form.amount
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Load Created Successfully');
              }
            });
          },
          update: function () {
            let self = this;
            this.$inertia.post(this.route('loads.update', this.form.id), {
              amount: this.form.amount,
              status: this.form.status,
              _method: "put"
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Load Updated Successfully');
              }
            });
          },
        }
    }
</script>

<style>

</style>
