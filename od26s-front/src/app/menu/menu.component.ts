import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  items: MenuItem[];
  itemR: MenuItem[];
  itemT: MenuItem[];
  itemSO: MenuItem[];
  slideMenu = false;
  


  ngOnInit() {
    this.items = [
      {
        label: 'Instituição',
        icon: 'pi pi-pw pi-globe',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'instituicao',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
          },
        ]
      }
      ,
      {
        label: 'Equipamentos',
        icon: 'pi pi-pw pi-sitemap',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'equipamento',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
      {
        label: 'Formulários',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'formulario',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
      {
        label: 'Modelo',
        icon: 'pi pi-pw pi-paperclip',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'modelo',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
      {
        label: 'Notas',
        icon: 'pi pi-pw pi-chart-bar',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'nota',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
      {
        label: 'Resultado',
        icon: 'pi pi-pw pi-filter',
        items: [{
          label: 'Novo',
          routerLink: 'resultados',
          icon: 'pi pi-fw pi-plus',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
      {
        label: 'Usuários',
        icon: 'pi pi-pw pi-user',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'usuario'
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
    ];


    this.itemR = [
      {
        label: 'Formulários',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'formulario',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
      
      {
        label: 'Usuários',
        icon: 'pi pi-pw pi-user',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'usuario'
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
    ];


    this.itemT = [
      {
        label: 'Resultado',
        icon: 'pi pi-pw pi-filter',
        items: [{
          label: 'Novo',
          routerLink: 'resultados',
          icon: 'pi pi-fw pi-plus',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
    ];

    this.itemSO = [
      {
        label: 'Formulários',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'formulario',
        },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search'
          },
        ]
      },
    ];
  }

  hasRole(permissao: string): boolean {
    return this.loginService.hasRole(permissao);
  }

}
