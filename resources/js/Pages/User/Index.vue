<template>
    <layout name="UserIndex">
      <!-- user list start -->
      <section class="users-list-wrapper">
        <!-- Ag Grid users list section start -->
        <div id="basic-examples">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div v-if="success" class="alert alert-success">
                  {{ success }}
                </div>

                <div class="table-responsive" v-if="users.data.length > 0">
                  <table id="data-table" class="table table-bordered display responsive nowrap mb-0" style="width: 100%">
                    <thead>
                    <tr>
                      <th class="text-uppercase" scope="col">{{ __('S.N.') }}</th>
                      <th class="text-uppercase">{{ __("Name") }}</th>
                      <th class="text-uppercase">{{ __("Created At") }}</th>
                      <th class="text-center text-uppercase">{{ __("Status") }}</th>
                      <th class="text-center text-uppercase">{{ __("Action") }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(user, index) in users.data" :key="user.id">
                      <th>{{ index + 1 }}</th>
                      <th>{{ user.name }}</th>
                      <td>{{ user.created_at | moment('DD-MM-YYYY') }}</td>
                      <td v-html="$options.filters.status(user.status)"></td>
                      <td class="text-center">
                        <a @click.prevent="setData(user)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                        <a @click.prevent="remove(user)" href="" class="text-warning" role="button"><i class="feather icon-trash"></i></a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <model :size="'modal-lg'">
          <template v-slot:header>
            <h4 class="modal-title" id="myModalLabel1">{{ modelTitle }}</h4>
            <button type="button" @click="cleanForm" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </template>

          <form @submit.prevent="storeOrUpdate">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text"
                           :placeholder="__('User Name')"
                           class="form-control"
                           :class="[errors.name ? 'is-invalid' : '']"
                           v-model="form.name">
                    <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.name[0] }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                      <input type="text"
                             :placeholder="__('Contact No.')"
                             class="form-control"
                             :class="[errors.phone ? 'is-invalid' : '']"
                             v-model="form.phone">
                      <span v-if="errors.phone" class="invalid-feedback" style="display: block;" role="alert">
                        <strong>{{ errors.phone[0] }}</strong>
                      </span>
                    </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <select
                      class="form-control"
                      :class="[errors.gender_id ? 'is-invalid' : '']"
                      v-model="form.gender_id">
                      <option value="">{{ __('Select Gender') }} ....</option>
                      <option v-for="gender in genders" :key="gender.id" :value="gender.id">{{ gender.name }}</option>
                    </select>
                    <span v-if="errors.gender_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.gender_id[0] }}</strong>
                    </span>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <select
                      class="form-control"
                      :class="[errors.religion_id ? 'is-invalid' : '']"
                      v-model="form.religion_id">
                      <option value="">{{ __('Select Religion') }} ....</option>
                      <option v-for="religion in religions" :key="religion.id" :value="religion.id">{{ religion.name }}</option>
                    </select>
                    <span v-if="errors.religion_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.religion_id[0] }}</strong>
                    </span>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <select
                      class="form-control"
                      :class="[errors.blood_group_id ? 'is-invalid' : '']"
                      v-model="form.blood_group_id">
                      <option value="">{{ __('Select Blood Group') }} ....</option>
                      <option v-for="blood_group in blood_groups" :key="blood_group.id" :value="blood_group.id">{{ blood_group.name }}</option>
                    </select>
                    <span v-if="errors.blood_group_id" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.blood_group_id[0] }}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <date-picker
                      v-model="form.birth_date"
                      :class="[errors.birth_date ? 'is-invalid' : '']">
                    </date-picker>
                    <span v-if="errors.birth_date" class="invalid-feedback" style="display: block;" role="alert">
                        <strong>{{ errors.birth_date[0] }}</strong>
                      </span>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="email"
                           :placeholder="__('Email Address')"
                           class="form-control"
                           :class="[errors.email ? 'is-invalid' : '']"
                           v-model="form.email">
                    <span v-if="errors.email" class="invalid-feedback" style="display: block;" role="alert">
                        <strong>{{ errors.email[0] }}</strong>
                      </span>
                  </div>
                </div>
              </div>

              <label class="float-left mt-2" v-if="editMode">
                <input type="checkbox" v-model="form.status" :checked="[form.status ? true : false]">
                {{ form.status ? __('Active') : __('Inactive')}}
              </label>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success waves-effect waves-light">{{ editMode ? __('Update') : __('Create') }}</button>
              <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">{{ __("Cancel") }}</button>
            </div>
          </form>
        </model>
        <!-- Ag Grid users list section end -->
      </section>
      <!-- user list ends -->
    </layout>
</template>

<script>
    import Layout from "../../Shared/Layout";
    import Model from "../../Components/Model";
    export default {
        name: "UserIndex",
      components: {Model, Layout},
      props: {
        success: String,
        users: Object,
        errors: Object,
        genders: Array,
        religions: Array,
        blood_groups: Array,
        divisions: Array,
      },
      data: function () {
        return {
          editMode: false,
          modelTitle: this.__('Create New User'),
          form: {
            id: '',
            name: '',
            phone: '',
            guardian_phone: '',
            email: '',
            gender_id: '',
            religion_id: '',
            blood_group_id: '',
            birth_date: new Date(),
            nationality: '',
            division: null,
            district: null,
            upazilla: null,
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
          this.form.status = data.status;
          this.form.id = data.id;
          $("#default").modal('show');
        },
        closeModel: function () {
          $("#default").modal('hide');
        },
        cleanForm: function () {
          this.modelTitle = this.__('Create New User');
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
          this.$inertia.post(this.route('users.store'), {
            name: this.form.name
          }).then(function () {
            if (Object.keys(self.errors).length === 0) {
              self.closeModel();
              self.cleanForm();
              self.$toast(self.__('User Created Successfully'));
            }
          });
        },
        update: function () {
          let self = this;
          this.$inertia.post(this.route('users.update', this.form.id), {
            name: this.form.name,
            status: this.form.status,
            _method: "put"
          }).then(function () {
            if (Object.keys(self.errors).length === 0) {
              self.closeModel();
              self.cleanForm();
              self.$toast(self.__('User Updated Successfully'));
            }
          });
        },
        remove: async function (user) {
          if (await this.$confirm()) {
            this.$inertia.delete(this.route('users.destroy', user.id));
            this.$toast(`${user.name } ${this.__('Deleted Successfully')}`);
          }
        }
      }
    }
</script>

<style>

</style>
