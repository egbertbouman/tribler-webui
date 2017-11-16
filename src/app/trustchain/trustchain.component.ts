import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'trustchain',
    templateUrl: './trustchain.component.html',
    styleUrls: ['./trustchain.component.css']
})
export class TrustchainComponent implements OnInit {
    statistics;
    blocks;
    chart_data = [
        {label: "MBytes given", data: []},
        {label: "MBytes taken", data: []}
    ];
    chart_options = {
        title: {
            display: true,
            fontColor: '#fff',
            fontSize: 18,
            fontWeight: "normal",
            text: 'MBytes given/taken over time'
        },
        legend: {
            display: true,
            labels: {fontColor: '#ddd'}
        },
        scales: {
            xAxes: [{
                type: 'time',
                ticks: {
                    fontColor: '#ddd'
                },
                time: {
                    format: 'X',
                    tooltipFormat: 'MMM DD HH:mm',
                    unit: 'day',
                    displayFormats: { 'day': 'MMM DD'}
                },
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                    fontColor: "#ddd",
                },
            }],
            yAxes: [{
                label: 'test',
                ticks: {
                    fontColor: '#ddd'
                },
                scaleLabel: {
                    display: true,
                    labelString: "Given/taken data (MBytes)",
                    fontColor: "#ddd",
                },
            }]
        },
        responsive: true,
        scaleShowVerticalLines: false,
        animationEasing: "easeOutBounce",
        pointLabelFontSize: 12,
        maintainAspectRatio: false,
    };
    chart_colors = [
        {
            borderColor: '#1F77B4',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            borderColor: '#FF7F0E',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
        this._triblerService.getTrustchainStatistics()
            .subscribe((stats: any) => {
                this.statistics = stats;
                this._triblerService.getTrustchainBlocks(stats.self_id).subscribe(blocks => {
                    var mb_given = [];
                    var mb_taken = [];
                    var self = this;
                    blocks.forEach(function(block, index) {
                        var date = new Date(block["insert_time"]);
                        if (block["public_key_requester"] === self.statistics.self_id) {
                            mb_given.push({x: date, y: block["total_up_requester"]});
                            mb_taken.push({x: date, y: block["total_down_requester"]});
                        }
                        else {
                            mb_given.push({x: date, y: block["total_up_responder"]});
                            mb_taken.push({x: date, y: block["total_down_responder"]});
                        }
                    });
                    this.chart_data = [
                        {label: "MBytes given", data: mb_given},
                        {label: "MBytes taken", data: mb_taken}
                    ];
                });
            });
    }
}
