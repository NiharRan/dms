import { InertiaApp } from '@inertiajs/inertia-vue';
import Vue from 'vue';

import VueMoment from 'vue-moment';
Vue.use(VueMoment);

import ProgressBar from 'vue-simple-progress';
Vue.component('progress-bar', ProgressBar);

import Multiselect from 'vue-multiselect';
Vue.component('multi-select', Multiselect);

import datePicker from 'vue-bootstrap-datetimepicker';
Vue.use(datePicker);

import InertiaTable from 'inertia-table';
Vue.use(InertiaTable);


Vue.config.productionTip = false;

Vue.mixin(require('./mixins/lang'));
Vue.mixin({ methods: { route: window.route } });

Vue.use(InertiaApp);

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

Vue.prototype.$confirm = async function () {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
  return result.isConfirmed;
}


Vue.prototype.$toast = function (msg, icon = 'success') {
  Toast.fire({
    icon: icon,
    title: msg
  });
}


Vue.filter('status', function (value) {
  const className = value == 1 ? 'badge-success' : 'badge-danger';
  const text = value == 1 ? 'Active' : 'Inactive';

  return `<span class="badge ${className}">${text}</span>`;
});

const app = document.getElementById('app');

new Vue({
  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => import(`@/Pages/${name}`),
    },
  }),
}).$mount(app);
