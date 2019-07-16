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
        label: 'Amostra',
        icon: 'pi pi-pw pi-globe',
        items: [
          //   {
          //   label: 'Novo',
          //   icon: 'pi pi-fw pi-plus'
          // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'amostra',
          },
        ]
      }
      ,
      {
        label: 'Instituição',
        icon: 'pi pi-pw pi-globe',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus'
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'instituicao',
          },
        ]
      }
      ,
      {
        label: 'Equipamentos',
        icon: 'pi pi-pw pi-sitemap',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus'
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'equipamento',
          },
        ]
      },
      {
        label: 'Formulários',
        icon: 'pi pi-pw pi-file',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus'
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'formulario',
          },
        ]
      },
      {
        label: 'Modelo',
        icon: 'pi pi-pw pi-paperclip',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus'
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'modelo',
          },
        ]
      },
      {
        label: 'Notas',
        icon: 'pi pi-pw pi-chart-bar',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'nota',
          },
        ]
      },
      {
        label: 'Resultado',
        icon: 'pi pi-pw pi-filter',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'resultado',
          },
        ]
      },
      {
        label: 'Usuários',
        icon: 'pi pi-pw pi-user',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'usuario'
          },
        ]
      },
    ];


    this.itemR = [
      {
        label: 'Formulários',
        icon: 'pi pi-pw pi-file',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'formulario',
          },
        ]
      },

      {
        label: 'Usuários',
        icon: 'pi pi-pw pi-user',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'usuario'
          },
        ]
      },
    ];


    this.itemT = [
      {
        label: 'Resultado',
        icon: 'pi pi-pw pi-filter',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'resultados',
          },
        ]
      },
    ];

    this.itemSO = [
      {
        label: 'Formulários',
        icon: 'pi pi-pw pi-file',
        items: [
        //   {
        //   label: 'Novo',
        //   icon: 'pi pi-fw pi-plus',
        // },
          {
            label: 'Procurar',
            icon: 'pi pi-fw pi-search',
            routerLink: 'formulario',
          },
        ]
      },
    ];
  }

  hasRole(permissao: string): boolean {
    return this.loginService.hasRole(permissao);
  }

}
