import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import Header from './header/Header';
import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineViews, Inject, ResourcesDirective, ResourceDirective, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import { extend, Internationalization, isNullOrUndefined } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
//import * as dataSource from './datasource.json';

import axios from 'axios';
/**
 * schedule room scheduler sample
 */
export class TimelineResource extends SampleBase {
    
    async componentDidMount(){
        const res = await axios.get('https://backendp1.herokuapp.com/users/');
        this.setState({
            data: res.data
        })
    }

    constructor() {
        super(...arguments);
        //const res=this.componentDidMount();
        //this.data = this.testvariable;
        this.instance = new Internationalization();
        this.ownerData = [
            { text: 'L1', id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
            { text: 'L2', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
            { text: 'L3', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
            { text: 'L4', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
            { text: 'L5', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
            { text: 'L6', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
            { text: 'L7', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
            { text: 'L8', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
            { text: 'CEF', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
            { text: 'DOE', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
        ];

        this.state = {
            data:[]
        }
    }
    getRoomName(value) {
        return value.resourceData[value.resource.textField];
    }
    getRoomType(value) {
        return value.resourceData.type;
    }
    getRoomCapacity(value) {
        return value.resourceData.capacity;
    }
    isReadOnly(endDate) {
        return (endDate < new Date(2018, 6, 31, 0, 0));
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap">
            <div className="room-name">{this.getRoomName(props)}</div>
            <div className="room-type">{this.getRoomType(props)}</div>
            <div className="room-capacity">{this.getRoomCapacity(props)}</div>
        </div>);
    }
    onActionBegin(args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data;
            if (args.requestType === 'eventCreate') {
                data = args.data[0];
            }
            else if (args.requestType === 'eventChange') {
                data = args.data;
            }
            if (!this.scheduleObj.isSlotAvailable(data)) {
                args.cancel = true;
            }
        }
    }
    onEventRendered(args) {
        let data = args.data;
        if (this.isReadOnly(data.EndTime)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    }
    onRenderCell(args) {
        if (args.element.classList.contains('e-work-cells')) {
            if (args.date < new Date(2018, 6, 31, 0, 0)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only-cells');
            }
        }
        if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            let target = args.element.querySelector('.e-resource-text');
            target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
        }
    }
    onPopupOpen(args) {
        let data = args.data;
        if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            console.log(data.Id);
            console.log(data);
            console.log(args.type + ' Esto es el type');
            console.log(args.target);
            console.log('mimamamemima');
            //data.element
            let target = (args.type === 'RecurrenceAlert' ||
                args.type === 'DeleteAlert') ? (data.element) : args.target;
                console.log(target); 
                console.log('Hola mundo'); 
            if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
                console.log('Hola mundo1');
                if ((target.classList.contains('e-read-only-cells')) ||
                    (!this.scheduleObj.isSlotAvailable(data))) {
                    args.cancel = true;
                }
            }
            else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
                (this.isReadOnly(data.EndTime))) {
                args.cancel = true;
            }
        }
    }
    render() {
        console.log(this.state.data);
        
        this.data = extend([], this.state.data, null, true);

        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='timeline-resource' ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2018, 7, 1)} workHours={{ start: '08:00', end: '18:00' }} timeScale={{ interval: 60, slotCount: 1 }} resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{
            dataSource: this.data,
            fields: {
                id: 'Id',
                subject: { title: 'Summary', name: 'Subject' },
                location: { title: 'Location', name: 'Location' },
                description: { title: 'Comments', name: 'Description' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' }
            }
        }} eventRendered={this.onEventRendered.bind(this)} popupOpen={this.onPopupOpen.bind(this)} actionBegin={this.onActionBegin.bind(this)} renderCell={this.onRenderCell.bind(this)} group={{ enableCompactView: false, resources: ['MeetingRoom'] }}>
                            <ResourcesDirective>
                                <ResourceDirective field='RoomId' title='Room Type' name='MeetingRoom' allowMultiple={true} dataSource={this.ownerData} textField='text' idField='id' colorField='color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='TimelineDay'/>
                                <ViewDirective option='TimelineWeek'/>
                            </ViewsDirective>
                            <Inject services={[TimelineViews, Resize, DragAndDrop]}/>
                        </ScheduleComponent>
                    </div>
                </div>

            </div>);
    }
}
//render(<Header />, document.getElementById('header'));
render(<TimelineResource />, document.getElementById('sample'));
