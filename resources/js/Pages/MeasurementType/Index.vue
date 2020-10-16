<template>
  <layout name="MeasurementType">
    <!-- Measurement type list start -->
    <section class="users-list-wrapper">
      <!-- Measurement type section start -->
      <div id="basic-examples">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>

              <div class="table-responsive" v-if="measurement_types.data.length > 0">
                <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
                  <thead>
                  <tr>
                    <th scope="col">{{__("S.N.")}}</th>
                    <th>{{__("Name")}}</th>
                    <th>{{__("Created At")}}</th>
                    <th class="text-center">{{__("Status")}}</th>
                    <th class="text-center">{{ __("Action")}}</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(measurement_type, index) in measurement_types.data" :key="measurement_type.id">
                      <th>{{ index + 1 }}</th>
                      <th>{{ measurement_type.name }}</th>
                      <td>{{ measurement_type.default_date_time }}</td>
                      <td v-html="$options.filters.status(measurement_type.status)"></td>
                      <td class="text-center">
                        <a @click.prevent="setData(measurement_type)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
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
                       :placeholder="__('Measurement Type Name')"
                       class="form-control"
                        :class="[errors.name ? 'is-invalid' : '']"
                        v-model="form.name">
              </div>
              <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                <strong>{{ errors.name[0] }}</strong>
              </span>

              <label class="float-left mt-2" v-if="editMode">
                <input type="checkbox" v-model="form.status" :checked="[form.status ? true : false]">
                {{ form.status ? __('Active') : __('Inactive')}}
              </label>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success waves-effect waves-light">{{ editMode ? __('Update') : __('Create') }}</button>
            <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">{{__("Cancel")}}</button>
          </div>
        </form>
      </model>
      <!-- Ag Grid users list section end -->
    </section>
    <!-- Measurement type list ends -->
  </layout>
</template>

<script>
    import Layout from "../../Shared/Layout";
    import Model from "../../Components/Model";
    export default {
        name: "MeasurementType",
        components: {Model, Layout},
        props: {
          success: String,
          measurement_types: Object,
          errors: Object,
        },
        data: function () {
          return {
            editMode: false,
            modelTitle: this.__('Create New Measurement Type'),
            form: {
              id: '',
              name: '',
              status: '',
            }
          }
        },
        methods: {
          setData: function (data) {
            this.modelTitle = `Edit ${data.name}'s Information`;
            this.editMode = true;
            this.form.name = data.name;
            this.form.status = data.status;
            this.form.id = data.id;
            $("#default").modal('show');
          },
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = this.__('Create New Measurement Type');
            this.editMode = false;
            this.form.name = '';
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
            this.$inertia.post(this.route('measurement-types.store'), {
              name: this.form.name
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Measurement Type Created Successfully');
              }
            });
          },
          update: function () {
            let self = this;
            this.$inertia.post(this.route('measurement-types.update', this.form.id), {
              name: this.form.name,
              status: this.form.status,
              _method: "put"
            }).then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Measurement Type Updated Successfully');
              }
            });
          },
        }
    }
</script>

<style>

</style>
