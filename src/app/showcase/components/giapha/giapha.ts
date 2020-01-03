import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Renderer2, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {
    TreeNode
} from 'primeng/api';
import {
    MessageService
} from 'primeng/api';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';
@Component({
    templateUrl: './giapha.html',
    providers: [MessageService],
    styles: [`
        .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
            padding: 0;
            border: 0 none;
        }

        .node-header,.node-content {
            padding: .5em .7em;
        }
        .content-section {
            padding: 10px 0px;
        }
        .content-section .feature-title {
            margin: 0;
            font-size: 25px !important;
            font-weight: bold;
        }
        .content-section.implementation {
            overflow: scroll;
        }
        .node-header {
            background-color: #1602c7;
            color: #ffffff;
        }
        .node-header.main-person {
            background-color: #c70202;
            color: #ffffff;
        }
        .node-header.girl {
            background-color: #0b9c2a;
            color: #ffffff;
        }
        .node-content {
            text-align: center;
            border: 1px solid #495ebb;
            display: flex;
        }
        .node-content img {
            border-radius: 50%;
        }
        .node-content .person {
            padding: 1px 10px;
        }
        .node-content .person .person-name {
            white-space: nowrap;
        }
        .ui-organizationchart-node-content.department-cfo {
            background-color: #7247bc;
            color: #ffffff;
        }
        
        .ui-organizationchart-node-content.department-coo {
            background-color: #a534b6;
            color: #ffffff;
        }
        
        .ui-organizationchart-node-content.department-cto {
            background-color: #e9286f;
            color: #ffffff;
        }
        
        .ui-person .ui-node-toggler {
            color: #495ebb !important;
        }
        
        .department-cto .ui-node-toggler {
            color: #8a0a39 !important;
        }
        .icon {
            background-color: rgb(75,173,243);
            color: white;
            border-radius: 10px;
            padding: 3px;
        }
        .lock-screen {
            height: 100%;
            overflow: hidden;
            width: 100%;
            position: fixed;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class Giapha implements OnInit , AfterViewInit, OnDestroy  {
    @ViewChild('gridElement', { static: true }) private gridElement: ElementRef;

    data1: TreeNode[];

    data2: TreeNode[];

    selectedNode: TreeNode;

    public panzoomConfig: PanZoomConfig = new PanZoomConfig({
        zoomLevels: 10,
        scalePerZoomLevel: 2.0,
        zoomStepDuration: 0.2,
        freeMouseWheelFactor: 0.01,
        zoomToFitZoomLevelFactor: 0.9,
        dragMouseButton: 'left'
      });
    private panZoomAPI: PanZoomAPI;
    private apiSubscription: Subscription;
    public panzoomModel: PanZoomModel;
    private modelChangedSubscription: Subscription;
    public canvasWidth = 2400;
    public initialZoomHeight: number = null; // set in resetZoomToFit()
    public initialZoomWidth = this.canvasWidth;
    public initialised = false;
    public scale = this.getCssScale(this.panzoomConfig.initialZoomLevel);
    private isMobile = false;
    constructor(private messageService: MessageService, private el: ElementRef, private renderer: Renderer2, private changeDetector: ChangeDetectorRef ) {}

    ngOnInit() {
        this.data1 = [{
            label: 'CEO',
            type: 'person',
            styleClass: 'ui-person',
            expanded: true,
            data: [{
                name: 'CỤ TỔ',
                gender: 'boy',
                // url: 'https://www.facebook.com/docaohuynh'
                // avatar: ''
            }],
            children: [{
                    label: 'CHI 1',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: [{
                        name: 'CHI 1',
                        gender: 'boy'
                    }],
                    children: [{
                            label: 'CHI 1 1',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 1 1',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [{
                                    label: 'TỀNH',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'TỀNH',
                                        gender: 'boy'
                                    }],
                                    children: [{
                                            label: 'GIÊNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'GIÊNG',
                                                gender: 'boy'
                                            }],
                                            children: [{
                                                    label: 'LỘC',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'LỘC',
                                                        gender: 'boy'
                                                    }]
                                                },
                                                {
                                                    label: 'HIỆP',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HIỆP',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        }
                                    ],
                                },
                                {
                                    label: 'KỀNH',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'KỀNH',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                        label: 'KHAM',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'KHAM',
                                            gender: 'boy'
                                        }, {
                                            name: 'VÊNH',
                                            gender: 'girl'
                                        }],
                                        children: [
                                            {
                                                label: 'NGUY',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'NGUY',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'ĐẢM',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'ĐẢM',
                                                    gender: 'boy'
                                                }, {
                                                    name: 'vợ',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'ĐẠI',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'ĐẠI',
                                                    gender: 'boy'
                                                }, {
                                                    name: 'PHAN',
                                                    gender: 'girl'
                                                }],
                                                children: [{
                                                        label: 'HÙNG',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HÙNG',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'THỦY',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'HUYỀN',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'HUYỀN',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'HUYÊN',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'HUYÊN',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'HUỲNH',
                                                                type: 'person',
                                                                styleClass: 'ui-person main-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'HUỲNH',
                                                                    gender: 'boy',
                                                                    avatar: 'https://www.dropbox.com/s/loz7ca6hfascbxr/Screen%20Shot%202020-01-02%20at%2023.56.25.png?dl=1',
                                                                    url: 'https://facebook.com/docaohuynh'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'HỔ',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HỔ',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'THANH',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'GIANG',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'GIANG',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'HOÀNG',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HOÀNG',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'CHIẾN',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'YẾN',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'YẾN',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'THÁI',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THÁI',
                                                                    gender: 'boy'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'HÀ',
                                                        type: 'person',
                                                        styleClass: 'ui-person girl',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HÀ',
                                                            gender: 'girl'
                                                        }]
                                                    },
                                                    {
                                                        label: 'HƯNG',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HƯNG',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'LAN',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'PHƯƠNG',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'PHƯƠNG',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'ANH',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'ANH',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    }
                                                ],
                                            },
                                            {
                                                label: 'NGÒA',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'NGÒA',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'LÀ',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'LÀ',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'ĐỨC',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'ĐỨC',
                                                    gender: 'boy'
                                                }, {
                                                    name: 'QUẾ',
                                                    gender: 'girl'
                                                }],
                                                children: [
                                                    {
                                                        label: 'PHÚC',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'PHÚC',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'NGÂN',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'MINH',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'MINH',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'MAI',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'MAI',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'BOY',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'BOY',
                                                                    gender: 'boy'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'HÒA',
                                                        type: 'person',
                                                        styleClass: 'ui-person girl',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HÒA',
                                                            gender: 'girl'
                                                        }]
                                                    },
                                                    {
                                                        label: 'HIÊN',
                                                        type: 'person',
                                                        styleClass: 'ui-person girl',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HIÊN',
                                                            gender: 'girl'
                                                        }]
                                                    },
                                                    {
                                                        label: 'PHONG',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'PHONG',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'VÂN',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'ÁNH',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'ÁNH',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'KHÔI',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'KHÔI',
                                                                    gender: 'boy'
                                                                }]
                                                            }
                                                        ],
                                                    }
                                                ]
                                            },
                                        ],
                                        }
                                    ],
                                },
                                {
                                    label: 'THOI',
                                    type: 'person',
                                    styleClass: 'ui-person girl',
                                    expanded: true,
                                    data: [{
                                        name: 'THOI',
                                        gender: 'girl'
                                    }]
                                },
                            ],
                        },
                        {
                            label: 'CHI 1 2',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 1 2',
                                gender: 'boy'
                            }],
                            children: [{
                                    label: 'THUẬN',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'THUẬN',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                        label: 'ĐỒN',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'ĐỒN',
                                            gender: 'boy'
                                        }, {
                                            name: 'vợ',
                                            gender: 'girl'
                                        }],
                                        children: [{
                                                label: 'KIỆN',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'KIỆN',
                                                    gender: 'boy'
                                                }, {
                                                    name: 'vợ',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'THÁT',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'THÁT',
                                                    gender: 'boy'
                                                }, {
                                                    name: 'MÈ',
                                                    gender: 'girl'
                                                }],
                                                children: [{
                                                        label: 'PHÁI',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'PHÁI',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'TOAN',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                            label: 'LAN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'LAN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'PHƯƠnG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'PHƯƠNG',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                        ],
                                                    },
                                                    {
                                                        label: 'HOA',
                                                        type: 'person',
                                                        styleClass: 'ui-person girl',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HOA',
                                                            gender: 'girl'
                                                        }]
                                                    },
                                                    {
                                                        label: 'THOẠI',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'THOẠI',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'THỦY',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'THẮNG',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THẮNG',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'HƯƠNG',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'HƯƠNG',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'BÌNH',
                                                        type: 'person',
                                                        styleClass: 'ui-person girl',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'BÌNH',
                                                            gender: 'girl'
                                                        }]
                                                    },
                                                    {
                                                        label: 'MẠNH',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'MẠNH',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'vợ',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'THỦY',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THỦY',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'TRUNG',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'TRUNG',
                                                                    gender: 'boy'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'BẢY',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'BẢY',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'vợ',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'TÂM',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'TÂM',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'TÁM',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'TÁM',
                                                            gender: 'boy'
                                                        }]
                                                    },
                                                ],
                                            },
                                            {
                                                label: 'KHIẾT',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'KHIẾT',
                                                    gender: 'boy'
                                                }, {
                                                    name: 'LÉT',
                                                    gender: 'girl'
                                                }],
                                                children: [{
                                                        label: 'KIỀN',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'KIỀN',
                                                            gender: 'boy'
                                                        }]
                                                    },
                                                    {
                                                        label: 'HIỂN',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'HIỂN',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'vợ',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'HÒA',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'HÒA',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'HẢO',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'HẢO',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'NHUẦN',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'NHUẦN',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'TỊNH',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'TỊNH',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'vợ',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'TIẾN',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'TIẾN',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'TÀI',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'TÀI',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'THẮNG',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THẮNG',
                                                                    gender: 'boy'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'THỊNH',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'THỊNH',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'vợ',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'LOAN',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'LOAN',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'THANH',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THANH',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'THUẬN',
                                                                type: 'person',
                                                                styleClass: 'ui-person',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THUẬN',
                                                                    gender: 'boy'
                                                                }]
                                                            },
                                                            {
                                                                label: 'THƠM',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'THƠM',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        label: 'PHIẾN',
                                                        type: 'person',
                                                        styleClass: 'ui-person girl',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'PHIẾN',
                                                            gender: 'girl'
                                                        }]
                                                    },
                                                    {
                                                        label: 'TUYỀN',
                                                        type: 'person',
                                                        styleClass: 'ui-person',
                                                        expanded: true,
                                                        data: [{
                                                            name: 'TUYỀN',
                                                            gender: 'boy'
                                                        }, {
                                                            name: 'vợ',
                                                            gender: 'girl'
                                                        }],
                                                        children: [{
                                                                label: 'TÂM',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'TÂM',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'NGA',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'NGA',
                                                                    gender: 'girl'
                                                                }]
                                                            },
                                                            {
                                                                label: 'YÊN',
                                                                type: 'person',
                                                                styleClass: 'ui-person girl',
                                                                expanded: true,
                                                                data: [{
                                                                    name: 'YÊN',
                                                                    gender: 'girl'
                                                                }]
                                                            }
                                                        ],
                                                    }
                                                ],
                                            },
                                            {
                                                label: 'ĐẦU',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'ĐẦU',
                                                    gender: 'boy'
                                                }]
                                            },
                                            {
                                                label: 'VIỄN',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'VIỄN',
                                                    gender: 'girl'
                                                }]
                                            }
                                        ],
                                    }
                                    ],
                                },
                                {
                                    label: 'nữ',
                                    type: 'person',
                                    styleClass: 'ui-person girl',
                                    expanded: true,
                                    data: [{
                                        name: 'nữ',
                                        gender: 'girl'
                                    }]
                                }
                            ],
                        }
                    ],
                },
                {
                    label: 'CHI 2',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: [{
                        name: 'CHI 2',
                        gender: 'boy'
                    }],
                    children: [{
                        label: 'CHI 2 1',
                        type: 'person',
                        styleClass: 'ui-person',
                        expanded: true,
                        data: [{
                            name: 'CHI 2 1',
                            gender: 'boy'
                        }, {
                            name: 'vợ',
                            gender: 'girl'
                        }],
                        children: [{
                                label: 'PHÓ',
                                type: 'person',
                                styleClass: 'ui-person',
                                expanded: true,
                                data: [{
                                    name: 'PHÓ',
                                    gender: 'boy'
                                }, {
                                    name: 'vợ',
                                    gender: 'girl'
                                }],
                                children: [{
                                        label: 'LẠNG',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'LẠNG',
                                            gender: 'boy'
                                        }]
                                    },
                                    {
                                        label: 'TÌNH',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'TÌNH',
                                            gender: 'boy'
                                        }, {
                                            name: 'BÔNG',
                                            gender: 'girl'
                                        }],
                                        children: [{
                                                label: 'THU',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'THU',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'NGHÊU',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'NGHÊU',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'NGHỆU',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'NGHỆU',
                                                    gender: 'girl'
                                                }]
                                            }
                                        ],
                                    }
                                ],
                            },
                            {
                                label: 'BẠT',
                                type: 'person',
                                styleClass: 'ui-person',
                                expanded: true,
                                data: [{
                                    name: 'BẠT',
                                    gender: 'boy'
                                }, {
                                    name: 'vợ',
                                    gender: 'girl'
                                }],
                                children: [{
                                        label: 'BÁT',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'BÁT',
                                            gender: 'boy'
                                        }, {
                                            name: 'vợ',
                                            gender: 'girl'
                                        }],
                                        children: [{
                                                label: 'CHÉN',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'CHÉN',
                                                    gender: 'girl'
                                                }]
                                            }
                                        ],
                                    }
                                ],
                            },
                            {
                                label: 'ĐIỀN',
                                type: 'person',
                                styleClass: 'ui-person',
                                expanded: true,
                                data: [{
                                    name: 'ĐIỀN',
                                    gender: 'boy'
                                }, {
                                    name: 'vợ',
                                    gender: 'girl'
                                }],
                                children: [{
                                        label: 'NGẢI',
                                        type: 'person',
                                        styleClass: 'ui-person girl',
                                        expanded: true,
                                        data: [{
                                            name: 'NGẢI',
                                            gender: 'girl'
                                        }]
                                    },
                                    {
                                        label: 'LAN',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'LAN',
                                            gender: 'boy'
                                        }, {
                                            name: 'MÓT',
                                            gender: 'girl'
                                        }],
                                        children: [{
                                                label: 'THẢO',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'THẢO',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'NGUYỀN',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'NGUYỀN',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'NGA',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'NGA',
                                                    gender: 'girl'
                                                }]
                                            }
                                        ],
                                    },
                                    {
                                        label: 'TUYẾT',
                                        type: 'person',
                                        styleClass: 'ui-person girl',
                                        expanded: true,
                                        data: [{
                                            name: 'TUYẾT',
                                            gender: 'girl'
                                        }]
                                    }
                                ],
                            },
                            {
                                label: 'NHAN',
                                type: 'person',
                                styleClass: 'ui-person',
                                expanded: true,
                                data: [{
                                    name: 'NHAN',
                                    gender: 'boy'
                                }, {
                                    name: 'vợ',
                                    gender: 'girl'
                                }],
                                children: [{
                                        label: 'NHƯ',
                                        type: 'person',
                                        styleClass: 'ui-person',
                                        expanded: true,
                                        data: [{
                                            name: 'NHƯ',
                                            gender: 'boy'
                                        }, {
                                            name: 'vợ',
                                            gender: 'girl'
                                        }],
                                        children: [{
                                                label: 'PHÚ',
                                                type: 'person',
                                                styleClass: 'ui-person',
                                                expanded: true,
                                                data: [{
                                                    name: 'PHÚ',
                                                    gender: 'boy'
                                                }]
                                            },
                                            {
                                                label: 'nữ',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'nữ',
                                                    gender: 'girl'
                                                }]
                                            },
                                            {
                                                label: 'nữ',
                                                type: 'person',
                                                styleClass: 'ui-person girl',
                                                expanded: true,
                                                data: [{
                                                    name: 'nữ',
                                                    gender: 'girl'
                                                }]
                                            }
                                        ],
                                    },
                                    {
                                        label: 'HẨY',
                                        type: 'person',
                                        styleClass: 'ui-person girl',
                                        expanded: true,
                                        data: [{
                                            name: 'HẨY',
                                            gender: 'girl'
                                        }]
                                    },
                                    {
                                        label: 'nữ',
                                        type: 'person',
                                        styleClass: 'ui-person girl',
                                        expanded: true,
                                        data: [{
                                            name: 'nữ',
                                            gender: 'girl'
                                        }]
                                    },
                                    {
                                        label: 'NHÀN',
                                        type: 'person',
                                        styleClass: 'ui-person girl',
                                        expanded: true,
                                        data: [{
                                            name: 'NHÀN',
                                            gender: 'girl'
                                        }]
                                    }
                                ],
                            }
                        ],
                    }
                ]
                },
                {
                    label: 'CHI 3',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: [{
                        name: 'CHI 3',
                        gender: 'boy'
                    }],
                    children: [{
                            label: 'CHI 3 1',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 3 1',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [{
                                    label: 'THOA',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'THOA',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'NGOẠI',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'NGOẠI',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'DOẠT',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'DOẠT',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'HỢP',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HỢP',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'RẶT',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'RẶT',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'LUYÊN',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'TUA',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TUA',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'PHIÊN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'PHIÊN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'QUYỀN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'QUYỀN',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'LIÊN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'LIÊN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THANH',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THANH',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THẢO',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THẢO',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'BẢO',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'BẢO',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'SEN',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'TRỌNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TRỌNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'TÂM',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TÂM',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'NGOAN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'NGOAN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'MƯỜI',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'MƯỜI',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ÚT',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ÚT',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'TÝ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TÝ',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            label: 'TỚN',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'TỚN',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [{
                                    label: 'CHUNG',
                                    type: 'person',
                                    styleClass: 'ui-person girl',
                                    expanded: true,
                                    data: [{
                                        name: 'CHUNG',
                                        gender: 'girl'
                                    }]
                                },
                                {
                                    label: 'CHAN',
                                    type: 'person',
                                    styleClass: 'ui-person girl',
                                    expanded: true,
                                    data: [{
                                        name: 'CHAN',
                                        gender: 'boy'
                                    }]
                                },
                                {
                                    label: 'HIẾU',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'HIẾU',
                                        gender: 'boy'
                                    }, {
                                        name: 'NGHĨA',
                                        gender: 'girl'
                                    }],
                                    children: [
                                        {
                                            label: 'KHIÊM',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'KHIÊM',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'NGHIÊN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'NGHIÊN',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'NHƯỜNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'NHƯỜNG',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'ĐÀN',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'ĐÀN',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'VẬY',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'XINH',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'XINH',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'BINH',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'BINH',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'LÝ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'HƯƠNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HƯƠNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'QUÝ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'QUÝ',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'CƯỜNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'CƯỜNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HIỀN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HIỀN',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'SON',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'SON',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'RỒNG',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'MẠNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'MẠNH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'LONG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'LONG',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        }
                                                    ],
                                                }
                                            ],
                                        },
                                        {
                                            label: 'HƯỜNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'HƯỜNG',
                                                gender: 'boy'
                                            }]
                                        },
                                        {
                                            label: 'TUÂN',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'TUÂN',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'NHỜN',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'NHỜN',
                                                gender: 'boy'
                                            }]
                                        },
                                        {
                                            label: 'BỢ',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'BỢ',
                                                gender: 'boy'
                                            }]
                                        },
                                        {
                                            label: 'BỚ',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'BỚ',
                                                gender: 'boy'
                                            }, {
                                                name: 'NHUẦN',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'LÂN',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'LÂN',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'MAI',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'TẦN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TẦN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'TỪ',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TỪ',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'TỐN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TỐN',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'HOA',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'CƯƠNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'CƯƠNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'CHUNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'CHUNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'PHƯỢNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'PHƯỢNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HOÀNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HOÀNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THẢO',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THẢO',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'TÚY',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TÚY',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THIỆN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THIỆN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'PHẨM',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'PHẨM',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'TÂM',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'CHÁNH',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CHÁNH',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'CHANH',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CHANH',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                    ],
                                                }
                                            ],
                                        },
                                        {
                                            label: 'NGỰ',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'NGỰ',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                },
                                {
                                    label: 'NĂNG',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'NĂNG',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'VỌC',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'VỌC',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'CƯƠNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'CƯƠNG',
                                                gender: 'boy'
                                            }, {
                                                name: 'TỐ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'VẬN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'VẬN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'GIAO',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'GIAO',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'vợ',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'CA',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CA',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'CƯỜNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CƯỜNG',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'QUÝ',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'QUÝ',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'PHÁI',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'PHÁI',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'ĐOÀI',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [
                                                    {
                                                        name: 'LUÂN',
                                                        gender: 'girl'
                                                    }, {
                                                        name: 'ĐOÀI',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'vợ',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'THƯỜNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THƯỜNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'MẠNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'MẠNH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'nam',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nam',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THÙY',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THÙY',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HÙNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÙNG',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                }
                                            ],
                                        },
                                        {
                                            label: 'CỬI',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'CỬI',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'ĐỆ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'ĐỆ',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'ĐẠO',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'ĐẠO',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'RỂ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'RỂ',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'nữ',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'nữ',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'NHUẦN',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'NHUẦN',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                },
                                {
                                    label: 'TẺO',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'TƯƠI',
                                        gender: 'girl'
                                    }, {
                                        name: 'TẺO',
                                        gender: 'boy'
                                    }, {
                                        name: 'CHỪNG',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'THONG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [
                                            {
                                                name: 'NGHỈ',
                                                gender: 'girl'
                                            }, {
                                                name: 'THONG',
                                                gender: 'boy'
                                            }, {
                                                name: 'HỞI',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'TRIỆC',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TRIỆC',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'XEN',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'PHƯỢNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'PHƯỢNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ĐIỂM',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐIỂM',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'TUẤN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TUẤN',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'TÍNH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'TÌNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TÌNH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THANH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THANH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THẮNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THẮNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THỦY',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THỦY',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THÊU',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THÊU',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THIỆN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THIỆN',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THẢO',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THẢO',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'TRÚC',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TRÚC',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'TRÀ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TRÀ',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'MƠI',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'MƠI',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'VANG',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'VANG',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'THUNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'THUNG',
                                                gender: 'boy'
                                            }, {
                                                name: 'THỜN',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'XƯỞNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'XƯỞNG',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'TẨM',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'TRAI',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TRAI',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'nam',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'nam',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'LAN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'LAN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HÀ',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÀ',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'MAO',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'MAI',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'nữ',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'nữ',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'HUYỀN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HUYỀN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'BA',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'BA',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'BÍCH',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'BÍCH',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'MIÊNG',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'TỐT',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TỐT',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'KHÔI',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'KHÔI',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'TÌNH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'KHANH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'KHANH',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'BÉ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'BÉ',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'KHÁNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'KHÁNH',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'TUẤN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TUẤN',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'OANH',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'OANH',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'NHÀN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'NHÀN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'KHOA',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'KHOA',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'THỊNH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'LINH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'LINH',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'DƯƠNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'DƯƠNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THAO',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THAO',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'NGA',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'NGA',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THUYẾT',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THUYẾT',
                                                                gender: 'boy',
                                                                url: 'https://www.facebook.com/profile.php?id=100007698187973',
                                                                avatar: 'https://www.dropbox.com/s/j12uegroruw42r8/thuyet.png?dl=1'
                                                            }, {
                                                                name: 'TÚ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'MINH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'MINH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THÔNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THÔNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'THOAN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'THOAN',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'DON',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'DON',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'XỀNH',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'XỀNH',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                }
                            ],
                        }
                    ]
                }, {
                    label: 'CHI 4',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: [{
                        name: 'CHI 4',
                        gender: 'boy'
                    }],
                    children: [{
                            label: 'CHI 4 1',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 4 1',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [{
                                    label: 'CHUYÊN',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'CHUYÊN',
                                        gender: 'boy'
                                    }]
                                },
                                {
                                    label: 'TỜI',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'TỜI',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'HIÊNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'HIÊNG',
                                                gender: 'boy'
                                            }]
                                        },
                                        {
                                            label: 'RẠM',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'RẠM',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'RƯỜNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'RƯỜNG',
                                                gender: 'boy'
                                            }]
                                        },
                                        {
                                            label: 'HIỀNG',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'HIỀNG',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'HỒI',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HỒI',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'SIỂU',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'VÒNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'VÒNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'VÂY',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'VÂY',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THÀNH',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THÀNH',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'LONG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'LONG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HƯƠNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HƯƠNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'TRƯỜNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TRƯỜNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THAI',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THAI',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ĐÔ',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐÔ',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'OANH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'OANH',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'DƯƠNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'DƯƠNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'BÁCH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'BÁCH',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'ĐỈNH',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐỈNH',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'HẰNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HẰNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'XUÂN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'XUÂN',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HÙNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÙNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        }
                                                    ],
                                                }
                                            ],
                                        },
                                        {
                                            label: 'LIỀN',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'LIỀN',
                                                gender: 'boy'
                                            }]
                                        },
                                    ],
                                },
                                {
                                    label: 'NHỊ',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'NHỊ',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'SÁO',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'SÁO',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'KÉN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'KÉN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'CHỌN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'CHỌN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'ĐẢI',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'ĐẢI',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'SỢI',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'SỢI',
                                                gender: 'boy'
                                            }]
                                        },
                                        {
                                            label: 'CHỢI',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'CHỢI',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'BƯỞI',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'BƯỞI',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'CAM',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'CAM',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'CAY',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'CAY',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        }
                                    ],
                                },
                                {
                                    label: 'CHUNG',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'CHUNG',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'NGẢI',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'NGẢI',
                                                gender: 'boy'
                                            }, {
                                                name: 'DẬU',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'TUYÊN',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TUYÊN',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'NGUYÊN',
                                                        gender: 'girl'
                                                    }],
                                                    children: [
                                                        {
                                                            label: 'BÔN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'BÔN',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'VIỆT',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'GẤM',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'GẤM',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'NHUNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'NHUNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'CƯỜNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'CƯỜNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'ĐÔ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'ĐÔ',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'LƯƠNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'LƯƠNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'DỴ',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'DỴ',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'KIM',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'CÚC',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'CÚC',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'DIỆU',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'DIỆU',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THÚY',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THÚY',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'TRANG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TRANG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'NGHIÊM',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'NGHIÊM',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'TÚC',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TÚC',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'DUY',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'DUY',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'DINH',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'DINH',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'MINH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'GIANG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'GIANG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HẠNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HẠNH',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HỒNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HỒNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'BÁ',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'BÁ',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'NGỌC',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'QUÂN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'QUÂN',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'QUỲNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'QUỲNH',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'THỂ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'THỂ',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'TỂ',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TỂ',
                                                        gender: 'boy'
                                                    }]
                                                },
                                                {
                                                    label: 'TÉNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TÉNG',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'QUẮC',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'QUẮC',
                                                        gender: 'boy'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'MÌ',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'MÌ',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'MỊ',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'MỊ',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                },
                                {
                                    label: 'KHÁNH',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'KHÁNH',
                                        gender: 'boy'
                                    }, {
                                        name: 'BỈNH',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'HÔ',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'HÔ',
                                                gender: 'boy'
                                            }, {
                                                name: 'SUNG',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'CỰ',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'CỰ',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'HỚN',
                                                        gender: 'girl'
                                                    }],
                                                    children: [
                                                        {
                                                            label: 'TÀI',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TÀI',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'NHINH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'THẮNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THẮNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HẢI',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HẢI',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'LIỆU',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'LIỆU',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'THỦY',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'HÒA',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HÒA',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HẠNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HẠNH',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'TẺM',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TẺM',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'BẢY',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'BẢY',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'XUYẾN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'XUYẾN',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'TÊNH',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'TÊNH',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'BẸO',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'BẸO',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                },
                                {
                                    label: 'THỦY',
                                    type: 'person',
                                    styleClass: 'ui-person girl',
                                    expanded: true,
                                    data: [{
                                        name: 'THỦY',
                                        gender: 'girl'
                                    }]
                                }
                            ],
                        }
                    ]
                },
                {
                    label: 'CHI 5',
                    type: 'person',
                    styleClass: 'ui-person',
                    expanded: true,
                    data: [{
                        name: 'CHI 5',
                        gender: 'boy'
                    }],
                    children: [
                        {
                            label: 'CHI 5 1',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 5 1',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [
                                {
                                    label: 'PHẨM',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'PHẨM',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [
                                        {
                                            label: 'LỪNG',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'LỪNG',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'LẨY',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'LẨY',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'LẬT',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'LẬT',
                                                        gender: 'boy'
                                                    }]
                                                },
                                                {
                                                    label: 'HẢI',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HẢI',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'nam',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [
                                            {
                                                name: 'nữ',
                                                gender: 'girl'
                                            },
                                            {
                                                name: 'nam',
                                                gender: 'boy'
                                            }, {
                                                name: 'ĐÁT',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'HẢO',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HẢO',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'HẸN',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'THANH',
                                                        gender: 'boy'
                                                    }]
                                                },
                                                {
                                                    label: 'XÔNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'XÔNG',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'UNG',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'YẾN',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'YẾN',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'KHÁNH',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'KHÁNH',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'DUY',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'DUY',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'PHA',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'PHA',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'HUỆ',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'HẢI',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HẢI',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'DƯƠNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'DƯƠNG',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HƯƠNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HƯƠNG',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'GA',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'GA',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'NÊ',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'DŨNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'DŨNG',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'nữ',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'nữ',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                }
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            label: 'CHI 5 2',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 5 2',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [{
                                    label: 'ỊT',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'ỊT',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [
                                        {
                                            label: 'CẦM',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'CẦM',
                                                gender: 'boy'
                                            }, {
                                                name: 'CHỰ',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'TƯỜNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TƯỜNG',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'ĐÀI',
                                                        gender: 'girl'
                                                    }],
                                                    children: [
                                                        {
                                                            label: 'CƯỜNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CƯỜNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'VĨNH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'HẰNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HẰNG',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'HẢI',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HẢI',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THỦY',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THỦY',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'CHUNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CHUNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'GIỎI',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'THÔNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THÔNG',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'HOA',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HOA',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'LONG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HOA',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'SƠN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'SƠN',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'ĐỒ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'ĐỒ',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        },
                                        {
                                            label: 'YÊN',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'YÊN',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'AN',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'AN',
                                                gender: 'boy'
                                            }, {
                                                name: 'BỔNG',
                                                gender: 'girl'
                                            }],
                                            children: [{
                                                    label: 'HUỆ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HUỆ',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'HỆ',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HỆ',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'HÒA',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HÒA',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'ĐỊNH',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'PHƯƠNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'PHƯƠNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HUYÊN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HUYÊN',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ĐẠT',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐẠT',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'LẪM',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'LẪM',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'THẪM',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'THẪM',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'QUYÊN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'QUYÊN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'KHUYÊN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'KHUYÊN',
                                                        gender: 'girl'
                                                    }]
                                                }
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            label: 'CHI 5 3',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'CHI 5 3',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [
                                {
                                    label: 'THIỀU',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'THIỀU',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'CỒNG',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'CỒNG',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                },
                                {
                                    label: 'KÍNH',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'KÍNH',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [
                                        {
                                            label: 'DÔ',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'DÔ',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'HUẬY',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'HUẬY',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'NGƯƠNG',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'HỒNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HỒNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ĐỨC',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐỨC',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ĐÔNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐÔNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'ĐOÀI',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'ĐOÀI',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'TẬY',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TẬY',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'CẬY',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'CẬY',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'BỞI',
                                                        gender: 'girl'
                                                    }],
                                                    children: [
                                                        {
                                                            label: 'THƯỞNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THƯỞNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'LOAN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'LOAN',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THANH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THANH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THUẬN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THUẬN',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THƠM',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THƠM',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THẤT',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THẤT',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'BẢO',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'BẢO',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'VÂN',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'LOAN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'LOAN',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THANH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THANH',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THUẬN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THUẬN',
                                                                        gender: 'boy'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THƠM',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THƠM',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THƯỜNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THƯỜNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'PHÚC',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'PHÚC',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'CHUNG',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'THẢO',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THẢO',
                                                                        gender: 'girl',
                                                                        avatar: 'https://www.dropbox.com/s/qnak5ziavyah70y/thao.jpg?dl=1',
                                                                        url: 'https://www.facebook.com/profile.php?id=100034723218176'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'THẢNH',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THẢNH',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                }
                                            ],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            label: 'THẶT',
                            type: 'person',
                            styleClass: 'ui-person',
                            expanded: true,
                            data: [{
                                name: 'THẶT',
                                gender: 'boy'
                            }, {
                                name: 'vợ',
                                gender: 'girl'
                            }],
                            children: [
                                {
                                    label: 'BẶT',
                                    type: 'person',
                                    styleClass: 'ui-person',
                                    expanded: true,
                                    data: [{
                                        name: 'BẶT',
                                        gender: 'boy'
                                    }, {
                                        name: 'vợ',
                                        gender: 'girl'
                                    }],
                                    children: [{
                                            label: 'SEN',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'SEN',
                                                gender: 'girl'
                                            }]
                                        },
                                        {
                                            label: 'TÌNH',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [{
                                                name: 'TÌNH',
                                                gender: 'boy'
                                            }, {
                                                name: 'vợ',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'ĐỔNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'ĐỔNG',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'VỪNG',
                                                        gender: 'girl'
                                                    }],
                                                    children: [
                                                        {
                                                            label: 'THOẠI',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THOẠI',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'TOAN',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'THÚY',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THÚY',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'TUẤN',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'TUẤN',
                                                                        gender: 'boy',
                                                                        url: 'https://www.facebook.com/minhtuankorea1986',
                                                                        avatar: 'https://www.dropbox.com/s/pdplzjgswaostmo/tuanthoai.jpg?dl=1'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'NGA',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'NGA',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'THẮNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THẮNG',
                                                                        gender: 'boy',
                                                                        url: 'https://www.facebook.com/MinhThangktqd.KiTo52B',
                                                                        avatar: 'https://www.dropbox.com/s/fu7rg4ce7pfgna7/rsz_thangthoai.jpg?dl=1'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'NGOẠI',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'NGOẠI',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'GIAO',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'GIAO',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THOA',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THOA',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'TRÁNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TRÁNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'OANH',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'HỒNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HỒNG',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'ĐẢNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [
                                                    {
                                                        name: 'ÂN',
                                                        gender: 'girl'
                                                    }, {
                                                        name: 'ĐẢNG',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'vợ',
                                                        gender: 'girl'
                                                    }],
                                                    children: [
                                                        {
                                                            label: 'BÓNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'BÓNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'HƯƠNG',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'THỊNH',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'THỊNH',
                                                                        gender: 'boy',
                                                                        url: 'https://www.facebook.com/profile.php?id=100006698760534',
                                                                        avatar: 'https://www.dropbox.com/s/5evr5ewn3f10f44/thinhbong.jpg?dl=1'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'VƯỢNG',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'VƯỢNG',
                                                                        gender: 'boy',
                                                                        url: 'https://www.facebook.com/because.iamd.b',
                                                                        avatar: 'https://www.dropbox.com/s/3rfg0l99zytckbf/rsz_vuongbong.jpg?dl=1'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'HUẾ',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HUẾ',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'HƯƠNG',
                                                                gender: 'girl'
                                                            }],
                                                            children: [{
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                },
                                                                {
                                                                    label: 'nam',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nam',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'CÚC',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'CÚC',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HIẾN',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HIẾN',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'THÌN',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'HIẾU',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'HIẾU',
                                                                        gender: 'boy'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'HÀ',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÀ',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HÙNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÙNG',
                                                                gender: 'boy'
                                                            }, {
                                                                name: 'vợ',
                                                                gender: 'girl'
                                                            }],
                                                            children: [
                                                                {
                                                                    label: 'nữ',
                                                                    type: 'person',
                                                                    styleClass: 'ui-person girl',
                                                                    expanded: true,
                                                                    data: [{
                                                                        name: 'nữ',
                                                                        gender: 'girl'
                                                                    }]
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            label: 'HƯƠNG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HƯƠNG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HÒA',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÒA',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                }
                                            ],
                                        },
                                        {
                                            label: 'NGHỊ',
                                            type: 'person',
                                            styleClass: 'ui-person',
                                            expanded: true,
                                            data: [
                                            {
                                                name: 'TUẦN',
                                                gender: 'girl'
                                            }, {
                                                name: 'NGHỊ',
                                                gender: 'boy'
                                            }, {
                                                name: 'MẬN',
                                                gender: 'girl'
                                            }],
                                            children: [
                                                {
                                                    label: 'NGỢI',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'NGỢI',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'XUYẾN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'XUYẾN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'TUYẾN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TUYẾN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'TRUNG',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'TRUNG',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'THOA',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'HÒA',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÒA',
                                                                gender: 'boy'
                                                            }]
                                                        },
                                                        {
                                                            label: 'HÒA',
                                                            type: 'person',
                                                            styleClass: 'ui-person',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÒA',
                                                                gender: 'boy'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'LUYẾN',
                                                    type: 'person',
                                                    styleClass: 'ui-person girl',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'LUYẾN',
                                                        gender: 'girl'
                                                    }]
                                                },
                                                {
                                                    label: 'THỦY',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'THỦY',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'HUYỀN',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'HÀ',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'HÀ',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'TRANG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TRANG',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                },
                                                {
                                                    label: 'NGÂN',
                                                    type: 'person',
                                                    styleClass: 'ui-person',
                                                    expanded: true,
                                                    data: [{
                                                        name: 'NGÂN',
                                                        gender: 'boy'
                                                    }, {
                                                        name: 'CHIÊN',
                                                        gender: 'girl'
                                                    }],
                                                    children: [{
                                                            label: 'TRANG',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'TRANG',
                                                                gender: 'girl'
                                                            }]
                                                        },
                                                        {
                                                            label: 'THẢO',
                                                            type: 'person',
                                                            styleClass: 'ui-person girl',
                                                            expanded: true,
                                                            data: [{
                                                                name: 'THẢO',
                                                                gender: 'girl'
                                                            }]
                                                        }
                                                    ],
                                                }
                                            ],
                                        },
                                        {
                                            label: 'LOAN',
                                            type: 'person',
                                            styleClass: 'ui-person girl',
                                            expanded: true,
                                            data: [{
                                                name: 'LOAN',
                                                gender: 'girl'
                                            }]
                                        }
                                    ],
                                }
                            ],
                        }
                    ]
                }
            ]
        }];

        this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', 'black');
        this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'overflow', 'hidden');
        this.apiSubscription = this.panzoomConfig.api.subscribe( (api: PanZoomAPI) => this.panZoomAPI = api );
        this.modelChangedSubscription = this.panzoomConfig.modelChanged.subscribe( (model: PanZoomModel) => this.onModelChanged(model) );
        this.isMobile = this.isMobileDevice();
    }




    ngAfterViewInit(): void {
        this.resetZoomToFit();
        this.initialised = true;
        this.changeDetector.detectChanges();
    }



    ngOnDestroy(): void {
        this.modelChangedSubscription.unsubscribe();
        this.apiSubscription.unsubscribe();
    }



    private isMobileDevice(): boolean {
        return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }



    onModelChanged(model: PanZoomModel): void {
        this.panzoomModel = JSON.parse(JSON.stringify(model));
        this.scale = this.getCssScale(this.panzoomModel.zoomLevel);
        this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }



    private getCssScale(zoomLevel: any): number {
        // log.debug('PanZoomComponent: getCssScale()');
        return Math.pow(this.panzoomConfig.scalePerZoomLevel, zoomLevel - this.panzoomConfig.neutralZoomLevel);
    }



    resetZoomToFit(): void {
        let height = this.gridElement.nativeElement.clientHeight;
        const width = this.gridElement.nativeElement.clientWidth;
        height = this.canvasWidth * height / width;
        this.panzoomConfig.initialZoomToFit = { x: 0, y: 0, width: this.canvasWidth, height: height };
        this.initialZoomHeight = height;
    }



    public zoomIn(): void {
        this.panZoomAPI.zoomIn();
    }



    public zoomOut(): void {
        this.panZoomAPI.zoomOut();
    }



    public resetView(): void {
        this.panZoomAPI.resetView();
    }



    public panLeft100(): void {
        this.panZoomAPI.panDelta( { x: -100, y: 0 } );
    }



    public panRight100(): void {
        this.panZoomAPI.panDelta( { x: 100, y: 0 } );
    }



    public panUp100(): void {
        this.panZoomAPI.panDelta( { x: 0, y: -100 } );
    }



    public panDown100(): void {
        this.panZoomAPI.panDelta( { x: 0, y: 100 } );
    }



    public panLeftPercent(): void {
        this.panZoomAPI.panDeltaPercent( { x: -20, y: 0 } );
    }



    public panRightPercent(): void {
        this.panZoomAPI.panDeltaPercent( { x: 20, y: 0 } );
    }



    public panUpPercent(): void {
        this.panZoomAPI.panDeltaPercent( { x: 0, y: -20 } );
    }



    public panDownPercent(): void {
        this.panZoomAPI.panDeltaPercent( { x: 0, y: 20 } );
    }



    public panToPoint(): void {
        // this.panZoomAPI.panToPoint( { x: 0, y: 0 } );
        this.panZoomAPI.panToPoint( { x: 2400, y: 4270 } );
        // this.panZoomAPI.panToPoint( { x: 2400, y: 0 } );
        // this.panZoomAPI.panToPoint( { x: 0, y: 4270 } );
    }
    onNodeSelect(event) {
        // this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    }
    openFacebook(data) {
        console.log(data);
        if (data.url) {
            window.open(data.url, '_blank');
        }
    }
}
