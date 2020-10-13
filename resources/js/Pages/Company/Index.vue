<template>
  <layout name="Company">
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

              <div v-if="companies.data.length > 0">
                <table id="data-table" class="table-responsive table table-bordered display nowrap mb-0" style="width: 100%">
                  <thead>
                  <tr>
                    <th colspan="2">
                      <select v-model="search.per_page" @change="searchData" class="form-control">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="25">50</option>
                        <option value="25">100</option>
                      </select>
                    </th>
                    <th colspan="3"></th>
                    <th colspan="2">
                      <input type="text" @keyup="searchData" v-model="search.query" class="form-control" placeholder="Search">
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">S.N.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Contact No.</th>
                    <th>E-mail</th>
                    <th>Created At</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(company, index) in companies.data" :key="company.id">
                    <th style="width: 50px">{{ index + 1 }}</th>
                    <th style="width: 150px;">
                      <a :href="company.profile_url"><img style="width: 100%" :src="company.current_logo" :alt="company.name"></a>
                    </th>
                    <th>
                      <h3><a :href="company.profile_url">{{ company.name }}</a></h3>
                    </th>
                    <th>
                      <h3>{{ company.owner }}</h3>
                    </th>
                    <th>
                      <div v-if="company.phones.length > 0">
                        <span
                          class="badge font-small-2"
                          style="padding: 5px; margin: 2px;"
                          :class="[phone.status ? 'badge-primary' : 'badge-warning']"
                          v-for="phone in company.phones"
                          :key="phone.id">{{ phone.phone }}</span>
                      </div>
                    </th>
                    <th>{{ company.email }}</th>
                    <td>{{ company.default_date_time }}</td>
                    <td v-html="$options.filters.status(company.status)"></td>
                    <td class="text-center">
                      <a @click.prevent="editData(company)" href="" class="text-info" role="button"><i class="feather icon-edit"></i></a>
                      <a @click.prevent="removeData(company)" href="" class="text-warning" role="button"><i class="feather icon-trash"></i></a>
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
                <div class="col-md-8 col-12">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>{{ __("Company Name") }}</label>
                        <input type="text"
                               :placeholder="__('Company Name')"
                               class="form-control"
                               :class="[errors.name ? 'is-invalid' : '']"
                               v-model="form.name">
                        <span v-if="errors.name" class="invalid-feedback" style="display: block;" role="alert">
                          <strong>{{ errors.name[0] }}</strong>
                        </span>
                      </div>
                    </div>

                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label>{{ __('Owner') }}</label>
                        <input type="text"
                               :placeholder="__('Owner')"
                               class="form-control"
                               :class="[errors.owner ? 'is-invalid' : '']"
                               v-model="form.owner">
                        <span v-if="errors.owner" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.owner[0] }}</strong>
                    </span>
                      </div>
                    </div>

                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label>{{ __("Email") }}</label>
                        <input type="text"
                               :placeholder="__('Company Email')"
                               class="form-control"
                               :class="[errors.email ? 'is-invalid' : '']"
                               v-model="form.email">
                        <span v-if="errors.email" class="invalid-feedback" style="display: block;" role="alert">
                      <strong>{{ errors.email[0] }}</strong>
                    </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 col-12">
                  <div class="form-group">
                    <div class="banner-logo-upload-box mx-auto" style="background: #f3f3f3;width: 170px;height: 140px;">
                      <img :src="form.image_url" class="users-avatar-shadow rounded" alt="">
                      <label class="btn-pill" style="font-size: 35px;">
                        <i class="fa fa-camera"></i>
                        <input @change="showImage" type="file" accept="image/*" class="hidden"/>
                      </label>
                    </div>
                    <span v-if="errors.logo" class="invalid-feedback text-center" style="display: block;" role="alert">
                      <strong>{{ errors.logo[0] }}</strong>
                    </span>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{ __('Contact No.') }}</label>
                    <multi-select
                      v-model="form.phones"
                      tag-placeholder="Add this contact no."
                      placeholder="Search or add a contact no"
                      label="phone"
                      :options="[]"
                      track-by="phone"
                      :multiple="true"
                      :taggable="true"
                      @tag="addTag"></multi-select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{ __('Description') }}</label>
                    <textarea v-model="form.description" rows="2" class="form-control"></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{ __('Address') }}</label>
                    <textarea v-model="form.address" rows="3" class="form-control"></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{ __('Head Office') }}</label>
                    <textarea v-model="form.head_office" rows="3" class="form-control"></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{ __('Dipu Office') }}</label>
                    <textarea v-model="form.dipu_office" rows="3" class="form-control"></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{ __('Sales Center') }}</label>
                    <textarea v-model="form.sales_center" rows="3" class="form-control"></textarea>
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
            <button type="button" @click="cleanForm" class="btn" data-dismiss="modal">{{ __('Cancel') }}</button>
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
  import DataTable from "../../Components/DataTable";

  export default {
        name: "Company",
        components: {DataTable, Model, Layout},
        props: {
          success: String,
          companies: Object,
          errors: Object,
        },
        data: function () {
          return {
            editMode: false,
            modelTitle: 'Create New Company',
            form: {
              id: '',
              name: '',
              owner: '',
              description: '',
              head_office: '',
              dipu_office: '',
              address: '',
              sales_center: '',
              email: '',
              phones: [],
              status: '',
              logo: null,
              image_url: ''
            },
            search: {
              per_page: 10,
              query: ''
            }
          }
        },
        methods: {
          addTag (newPhone) {
            const tag = {
              phone: newPhone,
              status: 1
            }
            this.form.phones.push(tag)
          },
          closeModel: function () {
            $("#default").modal('hide');
          },
          cleanForm: function () {
            this.modelTitle = 'Create New Company';
            this.editMode = false;
            this.form.name = '';
            this.form.owner = '';
            this.form.description = '';
            this.form.head_office = '';
            this.form.dipu_office = '';
            this.form.address = '';
            this.form.sales_center = '';
            this.form.email = '';
            this.form.phones = [];
            this.form.id = '';
            this.form.status = '';
            this.form.image_url = '';
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
            const phones = this.form.phones.map(phone => phone.phone);
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('owner', this.form.owner);
            formData.append('description', this.form.description);
            formData.append('head_office', this.form.head_office);
            formData.append('dipu_office', this.form.dipu_office);
            formData.append('address', this.form.address);
            formData.append('sales_center', this.form.sales_center);
            formData.append('email', this.form.email);
            formData.append('phones', phones);
            formData.append('logo', this.form.logo);
            this.$inertia.post(this.route('companies.store'), formData)
              .then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Company Created Successfully');
              }
            });
          },
          update: function () {
            let self = this;
            const phones = this.form.phones.map(phone => phone.phone);
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('owner', this.form.owner);
            formData.append('description', this.form.description);
            formData.append('head_office', this.form.head_office);
            formData.append('dipu_office', this.form.dipu_office);
            formData.append('address', this.form.address);
            formData.append('sales_center', this.form.sales_center);
            formData.append('email', this.form.email);
            formData.append('phones', phones);
            formData.append('logo', this.form.logo);
            formData.append('status', this.form.status);
            formData.append('_method', 'put');
            this.$inertia.post(this.route('companies.update', this.form.id), formData)
              .then(function () {
              if (Object.keys(self.errors).length === 0) {
                self.closeModel();
                self.cleanForm();
                self.$toast('Company Updated Successfully');
              }
            });
          },
          showImage: function (e) {
            const file = e.target.files[0];
            this.form.image_url = URL.createObjectURL(file);
            this.form.logo = file;
          },
          searchData: function () {
            this.$inertia.replace(this.route('companies.index'), {
              method: 'get',
              data: {
                search: this.search.query,
                per_page: this.search.per_page,
              },
              preserveState: true,
              preserveScroll: true,
            });
          },
          editData: function (data) {
            this.modelTitle = `Edit ${data.name}'s Information`;
            this.editMode = true;
            this.form.name = data.name;
            this.form.owner = data.owner;
            this.form.description = data.description;
            this.form.head_office = data.head_office;
            this.form.dipu_office = data.dipu_office;
            this.form.address = data.address;
            this.form.sales_center = data.sales_center;
            this.form.email = data.email;
            this.form.phones = data.phones;
            this.form.id = data.id;
            this.form.status = data.status;
            this.form.image_url = data.current_logo;
            $("#default").modal('show');
          },
          removeData: async function (data) {
            if (await this.$confirm()) {
              this.$inertia.delete(this.route('companies.destroy', data.id));
              this.$toast(`${data.name }s record deleted successfully`);
            }
          },
        },
        created() {
          this.searchData();
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
