import { Component, OnInit, ElementRef, Injector } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HomeWidget } from '../../interfaces/homeWidget';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Subject, Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css'],
  
})
export class ChartWidgetComponent implements OnInit, GridsterItem {

  chartTypes = [
    'AnnotationChart',
    'AreaChart',
    'Bar',
    'BarChart',
    'BubbleChart',
    'Calendar',
    'CandlestickChart',
    'ColumnChart',
    'ComboChart',
    'PieChart'
  ];
  dataTypes;
  

  ngOnInit(): void {

    this.getDataBaseTypes();
    
    const type = GoogleChartPackagesHelper.getPackageForChartName(this.myType);
    this.loaderService.onReady.subscribe( () => {
      this.loaderService.loadChartPackages([type]).subscribe(() => {
        // Start creating your chart now
        // Example:
        const formatter = new google.visualization.BarFormat();
      });
  
    });

    this.dataBaseService.getTable("EMPLOYEES").subscribe(data => {
      console.log(data)
      this.rawBase = data;
      this.fetchColumnNames();
      


        this.myColumnNames.subscribe(columns =>{
          console.log("subik: ")
          console.log(columns);
          this.rawBase.forEach((element,index) => {
            let rowData =[];
            columns.forEach(element => {
              
                rowData.push(data[index][""+element]) ;
            });
            this.myData[index] = rowData;
          });
          console.log(this.myData);
        })

        
      
      console.log(this.myData);
    
    })


    // this.myData = [
    //   ['London', 8136000],
    //   ['New York', 8538000],
    //   ['Paris', 2244000],
    //   ['Berlin', 3470000],
    //   ['Kairo', 19500000]
      
    // ];
  }

  //GRIDSTER
  x: number = 0;
  y: number = 0;
  cols: number = 6;
  rows: number = 4;

  chartTitle = "Chart"
  

  rawBase: Map<String, Object>[];
  myType = "BarChart";
  baseColumnNames = [];
  myColumnNames = new Subject<String[]>();
  tableName;

  colss = [];

  //myData = [[]] ;
  db = new Subject<any>();
  
  myData = [];
  
  constructor(private loaderService: ScriptLoaderService,
    private dataBaseService: HttpClientService) {
    

  }


  changeBarType(item){
    this.myType = item;
  }

  setTableName(newTableName){
    this.tableName = newTableName;
  }

  fetchColumnNames(){
    this.baseColumnNames = Object.keys(this.rawBase[0]);
    
  }

  addToColumns(columnName){
    this.colss.push(columnName)
    this.myColumnNames.next(this.colss);
    
  }

  getColumns():Observable<String[]>{
    return this.myColumnNames.asObservable();
  }

  getDataBaseTypes(){
    this.dataBaseService.getType("EMPLOYEES").subscribe(data => {this.dataTypes = data})
  }
}
