import angular from 'angular';
import template from './custom-table.tpl.html';
import usersService from '../../services/users.service';

export default angular
  .module('customTable.component', [])
  .factory(usersService.name, usersService.factory)
  .component('customTable', {
    template,
    controller: [usersService.name, function (_) {
      
    }],
  })
  .name;
