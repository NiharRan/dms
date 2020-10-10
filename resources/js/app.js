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

import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);


Vue.config.productionTip = false;

Vue.mixin(require('./mixins/lang'));
Vue.mixin(require('./mixins/number_transformar'));
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
  const className = value == 1 ? 'text-success' : 'text-danger';
  const text = value == 1 ? 'Active' : 'Inactive';

  return `<i class="fa fa-circle font-small-3 ${className} mr-50"></i>${text}`;
});

Vue.filter('payment_status', function (value) {
  const className = value == 1 ? 'text-success' : 'text-danger';
  const text = value == 1 ? 'Paid' : 'Not Paid';

  return `<i class="fa fa-circle font-small-3 ${className} mr-50"></i>${text}`;
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
