const selectOptions = {
    jianhu: [
        { label: '监护良好', value: 'A' },
        { label: '监护一般', value: 'B' },
        { label: '未监护', value: '0'},
    ],
    leibie:[
        { label: 'A. 孤儿', value: 'A' },
        { label: 'B. 特困儿童', value: 'B' },
        { label: 'C. 重病重残儿童', value: 'C'},
        { label: 'D. 贫困家庭儿童', value: 'D'},
        { label: 'E-1. 其他-打拐解救儿童', value: 'E-1'},
        { label: 'E-2. 其他-服刑人员子女', value: 'E-2'},
        { label: 'E-3. 其他-强制隔离戒毒人员子女', value: 'E-3'},
        { label: 'E-4. 其他-受虐待儿童', value: 'E-4'},
        { label: 'E-5. 其他-被恶意弃养儿童', value: 'E-5'},
        { label: 'E-6. 其他情况', value: 'E-6'}
    ],
    fuli:[
        { label: 'A. 纳入明天计划', value: 'A' },
        { label: 'B. 免费配置康复工具', value: 'B' },
        { label: 'C. 免费进行康复训练', value: 'C'},
        { label: 'D. 接受福利机构代替照料、养育辅导、康复训练等服务', value: 'D'},
    ],
    shenghuo:[
        { label: 'A. 孤儿保障', value: 'A' },
        { label: 'B. 特困救助', value: 'B' },
        { label: 'C. 低保救助', value: 'C'},
        { label: 'D. 临时救助', value: 'D'},
        { label: 'E. 残疾人两项补贴', value: 'E'},
        { label: 'F. 其他形式保障', value: 'F'},
        { label: 'G. 未保障', value: '0'},
    ],
    jiaoyu:[
        { label: 'A. 学前阶段保障', value: 'A' },
        { label: 'B. 义务教育两免一补', value: 'B' },
        { label: 'C. 高中、中职教育资助', value: 'C'},
        { label: 'D. 辍学', value: 'D'},
        { label: 'E. 未入学', value: 'E'},
        { label: 'F. 未保障', value: '0'},
    ],
    yiliao:[
        { label: 'A. 居民医疗保险', value: 'A' },
        { label: 'B. 大病医疗保险', value: 'B' },
        { label: 'C. 大病补充医疗保险', value: 'C'},
        { label: 'D. 大病医疗救助', value: 'D'},
        { label: 'E. 慈善救助', value: 'E'},
        { label: 'F. 未救助', value: '0'},
    ]

};

export default selectOptions;