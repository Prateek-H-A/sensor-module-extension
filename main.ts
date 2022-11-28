namespace ModuleWorld_Digital {

    export enum mwDigitalNum {
        //% blockId="P0P1" block="P0P1"
        P0P1 = 1,
        //% blockId="P2P3" block="P2P3"
        P2P3 = 2,
        //% blockId="P3P4" block="P3P4"
        P3P4 = 3,
        //% blockId="P4P5" block="P4P5"
        P4P5 = 4,
        //% blockId="P6P7" block="P6P7"
        P6P7 = 5,
        //% blockId="P8P9" block="P8P9"
        P8P9 = 6,
        //% blockId="P10P11" block="P10P11"
        P10P11 = 7,
        //% blockId="P12P13" block="P12P13"
        P12P13 = 8,
        //% blockId="P14P15" block="P14P15"
        P14P15 = 9,
        //% blockId="P1P10" block="P1P10"
        P1P10 = 10
    }


    export enum enObstacle {
        //% blockId="Obstacle" block="Obstacle"
        Obstacle = 0,
        //% blockId="NoObstacle" block="NoObstacle"
        NoObstacle = 1
    }

    export enum enPIR {
        //% blockId="NoPIR" block="NoPIR"
        NoPIR = 0,
        //% blockId="OPIR" block="OPIR"
        OPIR = 1
    }

    export enum enCollision {
        //% blockId="NoCollision" block="NoCollision"
        NoCollision = 0,
        //% blockId="OCollision" block="OCollision"
        OCollision = 1
    }

    export enum enVibration {
        //% blockId="NoVibration" block="NoVibration"
        NoVibration = 0,
        //% blockId="OVibration" block="OVibration"
        OVibration = 1
    }

    export enum DHT11Type {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,

        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,

        //% block="humidity(0~100)" enumval=2
        DHT11_humidity,
    }
    export enum enButton {
        //% blockId="Press" block="Press"
        Press = 0,
        //% blockId="Realse" block="Realse"
        Realse = 1
    }

    //% blockId="readdht11" block="value of dht11 %dht11type| at pin %value_DNum"
    //% weight=100
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5 
    export function dht11value(dht11type: DHT11Type, value_DNum: mwDigitalNum): number {
        let dht11pin;
        if (value_DNum == 1) { dht11pin = DigitalPin.P0; }
        else if (value_DNum == 2) { dht11pin = DigitalPin.P2; }
        else if (value_DNum == 3) { dht11pin = DigitalPin.P3; }
        else if (value_DNum == 4) { dht11pin = DigitalPin.P4; }
        else if (value_DNum == 5) { dht11pin = DigitalPin.P6; }
        else if (value_DNum == 6) { dht11pin = DigitalPin.P8; }
        else if (value_DNum == 7) { dht11pin = DigitalPin.P10; }
        else if (value_DNum == 8) { dht11pin = DigitalPin.P12; }
        else if (value_DNum == 9) { dht11pin = DigitalPin.P14; }
        else if (value_DNum == 10) { dht11pin = DigitalPin.P1; }

        pins.digitalWritePin(dht11pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(dht11pin)
        pins.setPull(dht11pin, PinPullMode.PullUp);
        switch (dht11type) {
            case 0:
                let dhtvalue1 = 0;
                let dhtcounter1 = 0;
                let dhtcounter1d = 0;
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);
                for (let j = 0; j <= 32 - 1; j++) {
                    dhtcounter1d = 0
                    while (pins.digitalReadPin(dht11pin) == 0) {
                        dhtcounter1d += 1;
                    }
                    dhtcounter1 = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        dhtcounter1 += 1;
                    }
                    if (j > 15) {
                        if (dhtcounter1 > dhtcounter1d) {
                            dhtvalue1 = dhtvalue1 + (1 << (31 - j));
                        }
                    }
                }
                return ((dhtvalue1 & 0x0000ff00) >> 8);
                break;
            case 1:
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);
                let dhtvalue = 0;
                let dhtcounter = 0;
                let dhtcounterd = 0;
                for (let k = 0; k <= 32 - 1; k++) {
                    dhtcounterd = 0
                    while (pins.digitalReadPin(dht11pin) == 0) {
                        dhtcounterd += 1;
                    }
                    dhtcounter = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        dhtcounter += 1;
                    }
                    if (k > 15) {
                        if (dhtcounter > dhtcounterd) {
                            dhtvalue = dhtvalue + (1 << (31 - k));
                        }
                    }
                }
                return Math.round((((dhtvalue & 0x0000ff00) >> 8) * 9 / 5) + 32);
                break;
            case 2:
                while (pins.digitalReadPin(dht11pin) == 1);
                while (pins.digitalReadPin(dht11pin) == 0);
                while (pins.digitalReadPin(dht11pin) == 1);

                let value = 0;
                let counter = 0;
                let counterd = 0;

                for (let l = 0; l <= 8 - 1; l++) {
                    counterd = 0
                    while (pins.digitalReadPin(dht11pin) == 0) {
                        counterd += 1;
                    }
                    counter = 0
                    while (pins.digitalReadPin(dht11pin) == 1) {
                        counter += 1;
                    }
                    if (counter > counterd) {
                        value = value + (1 << (7 - l));
                    }
                }
                return value;
            default:
                return 0;
        }
    }


    //% blockId=ModuleWorld_Digital_Ultrasonic block="Ultrasonic|pin %value_DNum"
    //% weight=97
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Ultrasonic(value_DNum: mwDigitalNum): number {
        //send pulse
        let Trig, Echo;
        if (value_DNum == 1) { Trig = DigitalPin.P0; Echo = DigitalPin.P1; }
        else if (value_DNum == 2) { Trig = DigitalPin.P2; Echo = DigitalPin.P3; }
        else if (value_DNum == 3) { Trig = DigitalPin.P3; Echo = DigitalPin.P4; }
        else if (value_DNum == 4) { Trig = DigitalPin.P4; Echo = DigitalPin.P5; }
        else if (value_DNum == 5) { Trig = DigitalPin.P6; Echo = DigitalPin.P7; }
        else if (value_DNum == 6) { Trig = DigitalPin.P8; Echo = DigitalPin.P9; }
        else if (value_DNum == 7) { Trig = DigitalPin.P10; Echo = DigitalPin.P11; }
        else if (value_DNum == 8) { Trig = DigitalPin.P12; Echo = DigitalPin.P13; }
        else if (value_DNum == 9) { Trig = DigitalPin.P14; Echo = DigitalPin.P15; }
        else if (value_DNum == 10) { Trig = DigitalPin.P1; Echo = DigitalPin.P10; }


        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(Trig, 0);

        //read pulse, maximum distance=500cm
        const d = pins.pulseIn(Echo, PulseValue.High, 500 * 58);

        return Math.idiv(d, 58);
    }

    //% blockId=ModuleWorld_Digital_IR block="IR|pin %value_DNum|value %value"
    //% weight=96
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function IR(value_DNum: mwDigitalNum, value: enObstacle): boolean {
        let pin;
        if (value_DNum == 1) { pin = DigitalPin.P0; }
        else if (value_DNum == 2) { pin = DigitalPin.P2; }
        else if (value_DNum == 3) { pin = DigitalPin.P3; }
        else if (value_DNum == 4) { pin = DigitalPin.P4; }
        else if (value_DNum == 5) { pin = DigitalPin.P6; }
        else if (value_DNum == 6) { pin = DigitalPin.P8; }
        else if (value_DNum == 7) { pin = DigitalPin.P10; }
        else if (value_DNum == 8) { pin = DigitalPin.P12; }
        else if (value_DNum == 9) { pin = DigitalPin.P14; }
        else if (value_DNum == 10) { pin = DigitalPin.P1; }

        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }

    //% blockId=ModuleWorld_Digital_PIR block="PIR|pin %value_DNum|value %value"
    //% weight=96
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function PIR(value_DNum: mwDigitalNum, value: enPIR): boolean {
        let pin2;
        if (value_DNum == 1) { pin2 = DigitalPin.P0; }
        else if (value_DNum == 2) { pin2 = DigitalPin.P2; }
        else if (value_DNum == 3) { pin2 = DigitalPin.P3; }
        else if (value_DNum == 4) { pin2 = DigitalPin.P4; }
        else if (value_DNum == 5) { pin2 = DigitalPin.P6; }
        else if (value_DNum == 6) { pin2 = DigitalPin.P8; }
        else if (value_DNum == 7) { pin2 = DigitalPin.P10; }
        else if (value_DNum == 8) { pin2 = DigitalPin.P12; }
        else if (value_DNum == 9) { pin2 = DigitalPin.P14; }
        else if (value_DNum == 10) { pin2 = DigitalPin.P1; }

        pins.setPull(pin2, PinPullMode.PullDown);
        pins.digitalWritePin(pin2, 1);
        return pins.digitalReadPin(pin2) == value;
    }

    //% blockId=ModuleWorld_Digital_Collision block="Collision|pin %value_DNum|value %value"
    //% weight=3
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Collision(value_DNum: mwDigitalNum, value: enCollision): boolean {

        let pin3;
        if (value_DNum == 1) { pin3 = DigitalPin.P0; }
        else if (value_DNum == 2) { pin3 = DigitalPin.P2; }
        else if (value_DNum == 3) { pin3 = DigitalPin.P3; }
        else if (value_DNum == 4) { pin3 = DigitalPin.P4; }
        else if (value_DNum == 5) { pin3 = DigitalPin.P6; }
        else if (value_DNum == 6) { pin3 = DigitalPin.P8; }
        else if (value_DNum == 7) { pin3 = DigitalPin.P10; }
        else if (value_DNum == 8) { pin3 = DigitalPin.P12; }
        else if (value_DNum == 9) { pin3 = DigitalPin.P14; }
        else if (value_DNum == 10) { pin3 = DigitalPin.P1; }

        pins.setPull(pin3, PinPullMode.PullUp);
        return pins.digitalReadPin(pin3) == value;
    }

    //% blockId=ModuleWorld_Digital_Button block="Button|pin %value_DNum|value %value"
    //% weight=3
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(value_DNum: mwDigitalNum, value: enButton): boolean {

        let pin4;
        if (value_DNum == 1) { pin4 = DigitalPin.P0; }
        else if (value_DNum == 2) { pin4 = DigitalPin.P2; }
        else if (value_DNum == 3) { pin4 = DigitalPin.P3; }
        else if (value_DNum == 4) { pin4 = DigitalPin.P4; }
        else if (value_DNum == 5) { pin4 = DigitalPin.P6; }
        else if (value_DNum == 6) { pin4 = DigitalPin.P8; }
        else if (value_DNum == 7) { pin4 = DigitalPin.P10; }
        else if (value_DNum == 8) { pin4 = DigitalPin.P12; }
        else if (value_DNum == 9) { pin4 = DigitalPin.P14; }
        else if (value_DNum == 10) { pin4 = DigitalPin.P1; }

        pins.setPull(pin4, PinPullMode.PullUp);
        return pins.digitalReadPin(pin4) == value;
    }
    //% blockId=ModuleWorld_Digital_Vibration block="Vibration|pin %value_DNum|get "
    //% weight=1
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Vibration(value_DNum: mwDigitalNum, handle: () => void): void {
        let pin5;
        if (value_DNum == 1) { pin5 = DigitalPin.P0; }
        else if (value_DNum == 2) { pin5 = DigitalPin.P2; }
        else if (value_DNum == 3) { pin5 = DigitalPin.P3; }
        else if (value_DNum == 4) { pin5 = DigitalPin.P4; }
        else if (value_DNum == 5) { pin5 = DigitalPin.P6; }
        else if (value_DNum == 6) { pin5 = DigitalPin.P8; }
        else if (value_DNum == 7) { pin5 = DigitalPin.P10; }
        else if (value_DNum == 8) { pin5 = DigitalPin.P12; }
        else if (value_DNum == 9) { pin5 = DigitalPin.P14; }
        else if (value_DNum == 10) { pin5 = DigitalPin.P1; }

        pins.setPull(pin5, PinPullMode.PullUp);
        pins.setEvents(pin5, PinEventType.Edge);
        control.onEvent(pin5, DAL.MICROBIT_PIN_EVT_FALL, handle);
    }


}
namespace ModuleWorld_Analog {

    export enum enRocker {
        //% blockId="NoState" block="NoState"
        NoState = 0,
        //% blockId="Up" block="Up"
        Up,
        //% blockId="Down" block="Down"
        Down,
        //% blockId="Left" block="Left"
        Left,
        //% blockId="Right" block="Right"
        Right
    }

    export enum mwAnalogNum {
        //% blockId="P0P1" block="P0P1"
        AP0P1 = 1,
        //% blockId="P2P3" block="P2P3"
        AP2P3 = 2,
        //% blockId="P3P4" block="P3P4"
        AP3P4 = 3
    }

    //% blockId=ModuleWorld_Anaglog_Light block="Light|pin %value_ANum"
    //% weight=100
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5 
    export function Light(value_ANum: mwAnalogNum): number {
        let lightpin;
        let value2: number;
        if (value_ANum == 1) { lightpin = AnalogPin.P0; }
        else if (value_ANum == 2) { lightpin = AnalogPin.P2; }
        else if (value_ANum == 3) { lightpin = AnalogPin.P3; }

        value2 = 1024 - pins.analogReadPin(lightpin);
        return value2;
        //return 0;
    }

    //% blockId=ModuleWorld_Anaglog_Sound block="Sound|pin %value_ANum"
    //% weight=99
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Sound(value_ANum: mwAnalogNum): number {
        let soundpin;
        let value3: number;
        if (value_ANum == 1) { soundpin = AnalogPin.P0; }
        else if (value_ANum == 2) { soundpin = AnalogPin.P2; }
        else if (value_ANum == 3) { soundpin = AnalogPin.P3; }

        value3 = pins.analogReadPin(soundpin);
        return value3;
        //return 0;
    }
    //% blockId=ModuleWorld_Anaglog_Potentiometer block="Potentiometer|pin %value_ANum"
    //% weight=2
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOption.columns=5
    export function Potentiometer(value_ANum: mwAnalogNum): number {
        let pin6;
        let value4: number;
        if (value_ANum == 1) { pin6 = AnalogPin.P0; }
        else if (value_ANum == 2) { pin6 = AnalogPin.P2; }
        else if (value_ANum == 3) { pin6 = AnalogPin.P3; }

        value4 = pins.analogReadPin(pin6);
        return value4;
    }

    //% blockId=ModuleWorld_Anaglog_Rocker block="Rocker|pin %value_ANum|value %value"
    //% weight=1
    //% blockGap=20
    export function Rocker(value_ANum: mwAnalogNum, value: enRocker): boolean {

        let pin1;
        let pin22;

        if (value_ANum == 1) { pin1 = AnalogPin.P0; pin22 = AnalogPin.P1; }
        else if (value_ANum == 2) { pin1 = AnalogPin.P2; pin22 = AnalogPin.P3; }
        else if (value_ANum == 3) { pin1 = AnalogPin.P3; pin22 = AnalogPin.P4; }

        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin22);

        let now_state = enRocker.NoState;

        if (x < 100) // 左
        {
            now_state = enRocker.Left;
        }
        else if (x > 700) //右
        {
            now_state = enRocker.Right;
        }
        else  // 上下
        {
            if (y < 100) //下
            {
                now_state = enRocker.Down;
            }
            else if (y > 700) //上
            {
                now_state = enRocker.Up;
            }
        }
        return now_state == value;
    }




}
namespace ModuleWorld_PWM {

    export enum enColor {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="Red" block="Red"
        Red,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="White" block="White"
        White,
        //% blockId="Cyan" block="Cyan"
        Cyan,
        //% blockId="Pinkish" block="Pinkish"
        Pinkish,
        //% blockId="Yellow" block="Yellow"
        Yellow
    }

    export enum mwDigitalNum {
        //% blockId="P0P1" block="P0P1"
        P0P1 = 1,
        //% blockId="P2P3" block="P2P3"
        P2P3 = 2,
        //% blockId="P3P4" block="P3P4"
        P3P4 = 3,
        //% blockId="P4P5" block="P4P5"
        P4P5 = 4,
        //% blockId="P6P7" block="P6P7"
        P6P7 = 5,
        //% blockId="P8P9" block="P8P9"
        P8P9 = 6,
        //% blockId="P10P11" block="P10P11"
        P10P11 = 7,
        //% blockId="P12P13" block="P12P13"
        P12P13 = 8,
        //% blockId="P14P15" block="P14P15"
        P14P15 = 9,
        //% blockId="P1P10" block="P1P10"
        P1P10 = 10
    }

    export enum mwServoNum {
        //% blockId="P1" block="P1"
        P1 = 1,
        //% blockId="P4" block="P4"
        P4 = 2,
        //% blockId="P2" block="P2"
        P2 = 3,
        //% blockId="P10" block="P10"
        P10 = 4
    }



    //% blockId=ModuleWorld_PWM_BuzzerPin block="Set Buzzer Pin|%value_DNum"
    //% weight=99
    //% blockGap=22
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function BuzzerPin(value_DNum: mwDigitalNum): void {
        let pinb;
        if (value_DNum == 1) { pinb = AnalogPin.P0 }
        else if (value_DNum == 2) { pinb = AnalogPin.P2 }
        else if (value_DNum == 3) { pinb = AnalogPin.P3 }
        else if (value_DNum == 4) { pinb = AnalogPin.P4 }
        else if (value_DNum == 5) { pinb = AnalogPin.P6 }
        else if (value_DNum == 6) { pinb = AnalogPin.P8 }
        else if (value_DNum == 7) { pinb = AnalogPin.P10 }
        else if (value_DNum == 8) { pinb = AnalogPin.P12 }
        else if (value_DNum == 9) { pinb = AnalogPin.P14 }
        else if (value_DNum == 10) { pinb = AnalogPin.P1 }

        pins.setAudioPin(pinb);
    }
    //% blockId=ModuleWorld_PWM_VibrationMot block="Vibration Motor|%value_DNum|speed %speed"
    //% weight=80
    //% blockGap=22
    //% speed.min=0 speed.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function VibrationMot(value_DNum: mwDigitalNum, speed: number): void {

        let pin7;
        if (value_DNum == 1) { pin7 = AnalogPin.P0; }
        else if (value_DNum == 2) { pin7 = AnalogPin.P2; }
        else if (value_DNum == 3) { pin7 = AnalogPin.P3; }
        else if (value_DNum == 4) { pin7 = AnalogPin.P4; }
        else if (value_DNum == 5) { pin7 = AnalogPin.P6; }
        else if (value_DNum == 6) { pin7 = AnalogPin.P8; }
        else if (value_DNum == 7) { pin7 = AnalogPin.P10; }
        else if (value_DNum == 8) { pin7 = AnalogPin.P12; }
        else if (value_DNum == 9) { pin7 = AnalogPin.P14; }
        else if (value_DNum == 10) { pin7 = AnalogPin.P1; }

        pins.analogWritePin(pin7, speed);
    }

    //% blockId=ModuleWorld_PWM_RGB block="RGB|(P12P13P14)|value1 %value1|value2 %value2|value3 %value3"
    //% weight=2
    //% blockGap=20
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(value1: number, value2: number, value3: number): void {

        pins.analogWritePin(AnalogPin.P13, value1 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P14, value2 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P12, value3 * 1024 / 256);
    }

    //% blockId=ModuleWorld_PWM_RGB2 block="RGB|(P12P13P14)|value %value"
    //% weight=1
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(value: enColor): void {
        let pin12 = DigitalPin.P13;
        let pin23 = DigitalPin.P14;
        let pin32 = DigitalPin.P12;

        switch (value) {
            case enColor.OFF: {
                pins.digitalWritePin(pin12, 0);
                pins.digitalWritePin(pin23, 0);
                pins.digitalWritePin(pin32, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pin12, 1);
                pins.digitalWritePin(pin23, 0);
                pins.digitalWritePin(pin32, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pin12, 0);
                pins.digitalWritePin(pin23, 1);
                pins.digitalWritePin(pin32, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pin12, 0);
                pins.digitalWritePin(pin23, 0);
                pins.digitalWritePin(pin32, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pin12, 1);
                pins.digitalWritePin(pin23, 1);
                pins.digitalWritePin(pin32, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pin12, 0);
                pins.digitalWritePin(pin23, 1);
                pins.digitalWritePin(pin32, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pin12, 1);
                pins.digitalWritePin(pin23, 0);
                pins.digitalWritePin(pin32, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pin12, 1);
                pins.digitalWritePin(pin23, 1);
                pins.digitalWritePin(pin32, 0);
                break;
            }
        }
    }

    //% blockId=ModuleWorld_PWM_Servo block="Servo(360)|pin %ServoNum|value %value"
    //% weight=6
    //% blockGap=20
    //% value.min=0 value.max=360
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Servo(ServoNum: mwServoNum, value: number): void {
        let pin8;
        if (ServoNum == 1) { pin8 = AnalogPin.P1; }
        else if (ServoNum == 2) { pin8 = AnalogPin.P4; }
        else if (ServoNum == 3) { pin8 = AnalogPin.P2; }
        else if (ServoNum == 4) { pin8 = AnalogPin.P10; }

        pins.servoSetPulse(pin8, Math.map(value, 0, 360, 500, 2500))
    }

    //% blockId=ModuleWorld_PWM_Servo2 block="Servo(270)|pin %ServoNum|value %value"
    //% weight=6
    //% blockGap=20
    //% value.min=0 value.max=270
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Servo2(ServoNum: mwServoNum, value: number): void {
        let pin9;
        if (ServoNum == 1) { pin9 = AnalogPin.P1; }
        else if (ServoNum == 2) { pin9 = AnalogPin.P4; }
        else if (ServoNum == 3) { pin9 = AnalogPin.P2; }
        else if (ServoNum == 4) { pin9 = AnalogPin.P10; }

        pins.servoSetPulse(pin9, Math.map(value, 0, 270, 500, 2500))
    }

}
namespace GestureRecognition {

    let Init_Register_Array = [
        [0xEF, 0x00],
        [0x37, 0x07],
        [0x38, 0x17],
        [0x39, 0x06],
        [0x41, 0x00],
        [0x42, 0x00],
        [0x46, 0x2D],
        [0x47, 0x0F],
        [0x48, 0x3C],
        [0x49, 0x00],
        [0x4A, 0x1E],
        [0x4C, 0x20],
        [0x51, 0x10],
        [0x5E, 0x10],
        [0x60, 0x27],
        [0x80, 0x42],
        [0x81, 0x44],
        [0x82, 0x04],
        [0x8B, 0x01],
        [0x90, 0x06],
        [0x95, 0x0A],
        [0x96, 0x0C],
        [0x97, 0x05],
        [0x9A, 0x14],
        [0x9C, 0x3F],
        [0xA5, 0x19],
        [0xCC, 0x19],
        [0xCD, 0x0B],
        [0xCE, 0x13],
        [0xCF, 0x64],
        [0xD0, 0x21],
        [0xEF, 0x01],
        [0x02, 0x0F],
        [0x03, 0x10],
        [0x04, 0x02],
        [0x25, 0x01],
        [0x27, 0x39],
        [0x28, 0x7F],
        [0x29, 0x08],
        [0x3E, 0xFF],
        [0x5E, 0x3D],
        [0x65, 0x96],
        [0x67, 0x97],
        [0x69, 0xCD],
        [0x6A, 0x01],
        [0x6D, 0x2C],
        [0x6E, 0x01],
        [0x72, 0x01],
        [0x73, 0x35],
        [0x74, 0x00],
        [0x77, 0x01]]

    let Init_PS_Array = [
        [0xEF, 0x00],
        [0x41, 0x00],
        [0x42, 0x00],
        [0x48, 0x3C],
        [0x49, 0x00],
        [0x51, 0x13],
        [0x83, 0x20],
        [0x84, 0x20],
        [0x85, 0x00],
        [0x86, 0x10],
        [0x87, 0x00],
        [0x88, 0x05],
        [0x89, 0x18],
        [0x8A, 0x10],
        [0x9f, 0xf8],
        [0x69, 0x96],
        [0x6A, 0x02],
        [0xEF, 0x01],
        [0x01, 0x1E],
        [0x02, 0x0F],
        [0x03, 0x10],
        [0x04, 0x02],
        [0x41, 0x50],
        [0x43, 0x34],
        [0x65, 0xCE],
        [0x66, 0x0B],
        [0x67, 0xCE],
        [0x68, 0x0B],
        [0x69, 0xE9],
        [0x6A, 0x05],
        [0x6B, 0x50],
        [0x6C, 0xC3],
        [0x6D, 0x50],
        [0x6E, 0xC3],
        [0x74, 0x05]]

    let Init_Gesture_Array = [
        [0xEF, 0x00],
        [0x41, 0x00],
        [0x42, 0x00],
        [0xEF, 0x00],
        [0x48, 0x3C],
        [0x49, 0x00],
        [0x51, 0x10],
        [0x83, 0x20],
        [0x9F, 0xF9],
        [0xEF, 0x01],
        [0x01, 0x1E],
        [0x02, 0x0F],
        [0x03, 0x10],
        [0x04, 0x02],
        [0x41, 0x40],
        [0x43, 0x30],
        [0x65, 0x96],
        [0x66, 0x00],
        [0x67, 0x97],
        [0x68, 0x01],
        [0x69, 0xCD],
        [0x6A, 0x01],
        [0x6B, 0xB0],
        [0x6C, 0x04],
        [0x6D, 0x2C],
        [0x6E, 0x01],
        [0x74, 0x00],
        [0xEF, 0x00],
        [0x41, 0xFF],
        [0x42, 0x01]]

    const PAJ7620_ID = 0x73                   //手势识别模块地址
    const PAJ7620_REGITER_BANK_SEL = 0xEF     //寄存器库选择

    const PAJ7620_BANK0 = 0
    const PAJ7620_BANK1 = 1

    const GES_RIGHT_FLAG = 1
    const GES_LEFT_FLAG = 2
    const GES_UP_FLAG = 4
    const GES_DOWN_FLAG = 8
    const GES_FORWARD_FLAG = 16
    const GES_BACKWARD_FLAG = 32
    const GES_CLOCKWISE_FLAG = 64
    const GES_COUNT_CLOCKWISE_FLAG = 128
    const GES_WAVE_FLAG = 1



    export enum Gesture_state {
        //% blockId="right" block="right"
        right = 1,
        //% blockId="left" block="left"  
        left = 2,
        //% blockId="up" block="up"        
        up = 4,
        //% blockId="down" block="down"        
        down = 8,
        //% blockId="forward" block="forward"        
        forward = 16,
        //% blockId="backward" block="backward"        
        backward = 32,
        //% blockId="clockwise" block="clockwise"        
        clockwise = 64,
        //% blockId="count_clockwise" block="count_clockwise"        
        count_clockwise = 128,
        //% blockId="wave" block="wave"        
        wave = 256
    }


    function GestureWriteReg(addr: number, cmd: number) {

        let buf = pins.createBuffer(2);
        buf[0] = addr;
        buf[1] = cmd;
        pins.i2cWriteBuffer(PAJ7620_ID, buf);
    }

    function GestureReadReg(addr: number): number {

        let buf2 = pins.createBuffer(1);
        buf2[0] = addr;
        pins.i2cWriteBuffer(PAJ7620_ID, buf2);

        let result = pins.i2cReadNumber(PAJ7620_ID, NumberFormat.UInt8LE, false);
        return result;
    }




    function GestureSelectBank(bank: number): void {
        switch (bank) {
            case 0:
                GestureWriteReg(PAJ7620_REGITER_BANK_SEL, PAJ7620_BANK0);
                break;
            case 1:
                GestureWriteReg(PAJ7620_REGITER_BANK_SEL, PAJ7620_BANK1);
                break;
            default:
                break;
        }

    }

    //% blockId="GestureInit" block="gesture init(success：0 failure：255)"
    export function GestureInit(): number {
        basic.pause(800);//等待芯片稳定

        /*GestureSelectBank(0);
        GestureSelectBank(0);
        if((GestureReadReg(0) != 0x20)||(GestureReadReg(1)!=0x76))
        {
            return 0xff;
            
        }*/
        if (GestureReadReg(0) != 0x20) {
            return 0xff;

        }


        for (let m = 0; m < Init_Register_Array.length; m++) {
            GestureWriteReg(Init_Register_Array[m][0], Init_Register_Array[m][1]);

        }
        GestureSelectBank(0);

        for (let n = 0; n < Init_Gesture_Array.length; n++) {
            GestureWriteReg(Init_Gesture_Array[n][0], Init_Gesture_Array[n][1]);

        }

        return 0;

    }

    //% blockId="GetGesture" block="get gesture"
    export function GetGesture(): number {

        let date = GestureReadReg(0x43);

        switch (date) {
            case GES_RIGHT_FLAG:
            case GES_LEFT_FLAG:
            case GES_UP_FLAG:
            case GES_DOWN_FLAG:
            case GES_FORWARD_FLAG:
            case GES_BACKWARD_FLAG:
            case GES_CLOCKWISE_FLAG:
            case GES_COUNT_CLOCKWISE_FLAG:
                break;

            default:
                date = GestureReadReg(0x44);
                if (date == GES_WAVE_FLAG) {
                    return 256;
                }
                break;

        }

        return date;
    }

    //% blockId="SelectGesture" block="select gesture is %state"
    export function SelectGesture(state: Gesture_state): number {

        return state;
    }
}
namespace Module_World_Color {

    const COLOR_ADD = 0X53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0X10;
    const COLOR_G = 0X0D;
    const COLOR_B = 0x13;

    let initialized = false;
    let val_red = 0;
    let val_green = 0;
    let val_blue = 0;

    export enum enGetRGB {
        //% blockId="GetValueR" block="GetValueR"
        GetValueR = 0,
        //% blockId="GetValueG" block="GetValueG"
        GetValueG = 1,
        //% blockId="GetValueB" block="GetValueB"
        GetValueB = 2
    }

    function i2cWriteData(addr: number, reg: number, value: number) {
        let buf3 = pins.createBuffer(2);
        buf3[0] = reg;
        buf3[1] = value;
        pins.i2cWriteBuffer(addr, buf3);
    }

    function setRegConfig(): void {
        i2cWriteData(COLOR_ADD, COLOR_REG, 0X06);
        i2cWriteData(COLOR_ADD, 0X04, 0X41);
        i2cWriteData(COLOR_ADD, 0x05, 0x01);
    }

    function initColorI2C(): void {
        setRegConfig();
        initialized = true;
    }

    function GetRGB(): void {
        let buff_R = pins.createBuffer(2);
        let buff_G = pins.createBuffer(2);
        let buff_B = pins.createBuffer(2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        buff_G = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);
        buff_B = pins.i2cReadBuffer(COLOR_ADD, 2);

        let Red = (buff_R[1] & 0xff) << 8 | (buff_R[0] & 0xff);
        let Green = (buff_G[1] & 0xff) << 8 | (buff_G[0] & 0xff);
        let Blue = (buff_B[1] & 0xff) << 8 | (buff_B[0] & 0xff);

        if (Red > 4500) Red = 2300;
        if (Green > 7600) Green = 4600;
        if (Blue > 4600) Blue = 2700;

        val_red = Math.map(Red, 0, 2300, 0, 255);
        val_green = Math.map(Green, 0, 4600, 0, 255);
        val_blue = Math.map(Blue, 0, 2700, 0, 255);

        if (val_red > 255) val_red = 255;
        if (val_green > 255) val_green = 255;
        if (val_blue > 255) val_blue = 255;

        if (val_red == val_green && val_red == val_blue) {
            val_red = 255;
            val_green = 255;
            val_blue == 255;
        }
        else if (val_red > val_green && val_red > val_blue) {
            val_red = 255;
            val_green /= 2;
            val_blue /= 2;
        }
        else if (val_green > val_red && val_green > val_blue) {
            val_green = 255;
            val_red /= 2;
            val_blue /= 2;
        }
        else if (val_blue > val_red && val_blue > val_green) {
            val_blue = 255;
            val_red /= 2;
            val_green /= 2;
        }
    }

    //% blockId=ModuleWorld_Sensor_GetRGBValue block="GetRGBValue|value %value"
    //% blockGap=20
    //% weight=98
    //% color="#0000cd"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function GetRGBValue(value: enGetRGB): number {
        if (!initialized) {
            initColorI2C();
        }
        GetRGB();
        switch (value) {
            case enGetRGB.GetValueR:
                return val_red;
            case enGetRGB.GetValueG:
                return val_green;
            case enGetRGB.GetValueB:
                return val_blue;
            default:
                break;
        }
        return 0;
    }

}
namespace TM1650 {

    let COMMAND_I2C_ADDRESS = 0x24
    let DISPLAY_I2C_ADDRESS = 0x34
    let _SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];

    let TM1650_CDigits = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x82, 0x21, 0x00, 0x00, 0x00, 0x00, 0x02, 0x39, 0x0F, 0x00, 0x00, 0x00, 0x40, 0x80, 0x00,
        0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7f, 0x6f, 0x00, 0x00, 0x00, 0x48, 0x00, 0x53,
        0x00, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71, 0x6F, 0x76, 0x06, 0x1E, 0x00, 0x38, 0x00, 0x54, 0x3F,
        0x73, 0x67, 0x50, 0x6D, 0x78, 0x3E, 0x00, 0x00, 0x00, 0x6E, 0x00, 0x39, 0x00, 0x0F, 0x00, 0x08,
        0x63, 0x5F, 0x7C, 0x58, 0x5E, 0x7B, 0x71, 0x6F, 0x74, 0x02, 0x1E, 0x00, 0x06, 0x00, 0x54, 0x5C,
        0x73, 0x67, 0x50, 0x6D, 0x78, 0x1C, 0x00, 0x00, 0x00, 0x6E, 0x00, 0x39, 0x30, 0x0F, 0x00, 0x00
    ];

    let _intensity = 3
    let dbuf = [0, 0, 0, 0]
    let iPosition = ""

    /**
     * send command to display
     * @param is command, eg: 0
     */
    function cmd(c: number) {
        pins.i2cWriteNumber(COMMAND_I2C_ADDRESS, c, NumberFormat.Int8BE)
    }

    /**
     * send data to display
     * @param is data, eg: 0
     */
    function dat(bit: number, d: number) {
        pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + (bit % 4), d, NumberFormat.Int8BE)
    }

    /**
     * turn on display
     */
    //% blockId="TM650_ON" block="turn on display"
    //% weight=50 blockGap=8
    export function on() {
        cmd(_intensity * 16 + 1)
    }

    /**
     * turn off display
     */
    //% blockId="TM650_OFF" block="turn off display"
    //% weight=50 blockGap=8
    export function off() {
        _intensity = 0
        cmd(0)
    }

    /**
     * clear display content
     */
    //% blockId="TM650_CLEAR" block="clear display"
    //% weight=40 blockGap=8
    export function clear() {
        dat(0, 0)
        dat(1, 0)
        dat(2, 0)
        dat(3, 0)
        dbuf = [0, 0, 0, 0]
    }

    /**
     * show a digital in given position
     * @param digit is number (0-15) will be shown, eg: 1
     * @param bit is position, eg: 0
     */
    //% blockId="TM650_DIGIT" block="show digit %num|at %bit"
    //% weight=80 blockGap=8
    //% num.max=15 num.min=0
    export function digit(num: number, bit: number) {
        dbuf[bit % 4] = _SEG[num % 16]
        dat(bit, _SEG[num % 16])
    }

    /**
     * show a number in display
     * @param num is number will be shown, eg: 100
     */
    //% blockId="TM650_SHOW_NUMBER" block="show number %num"
    //% weight=100 blockGap=8
    export function showNumber(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit(Math.idiv(num, 1000) % 10, 0)
        digit(num % 10, 3)
        digit(Math.idiv(num, 10) % 10, 2)
        digit(Math.idiv(num, 100) % 10, 1)
    }


    //% blockId="showSring" block="show string %str"
    //% weight=100 blockGap=8
    export function showSring(str: string) {
        for (let o = 0; o < 4; o++) {
            let a = str.charCodeAt(o) & 0x7F;
            let dot = str.charCodeAt(o) & 0x80;
            dbuf[o] = TM1650_CDigits[a];
            if (a) {
                pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + o, dbuf[o] | dot, NumberFormat.Int8BE)
            }
            else {
                break;
            }

        }
    }


    function displayRuning(str: string, del: number): number {
        iPosition = str;
        showSring(iPosition);
        basic.pause(del);
        let p = iPosition.length;

        if (p < 4) {
            return 0;
        }
        else {
            return (p - 4);
        }

    }

    function displayRunningShift(): number {

        if (iPosition.length <= 4) {
            return 0;

        }
        else {
            iPosition = iPosition.substr(1, iPosition.length - 1);
            showSring(iPosition);
            return (iPosition.length - 4);
        }

    }

    //% blockId="showRunging" block="scroll display %str | rolling time(ms) %del"
    //% weight=90 blockGap=8
    export function showRunging(str: string, del: number) {
        if (displayRuning(str, del)) {
            while (displayRunningShift()) {
                basic.pause(del);
            }

        }


    }



    /**
     * show a number in hex format
     * @param num is number will be shown, eg: 123
     */
    //% blockId="TM650_SHOW_HEX_NUMBER" block="show hex number %num"
    //% weight=90 blockGap=8
    export function showHex(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            digit((num >> 12) % 16, 0)
        digit(num % 16, 3)
        digit((num >> 4) % 16, 2)
        digit((num >> 8) % 16, 1)
    }

    /**
     * show Dot Point in given position
     * @param bit is positiion, eg: 0
     * @param show is true/false, eg: true
     */
    //% blockId="TM650_SHOW_DP" block="show dot point %bit|show %num"
    //% weight=80 blockGap=8
    export function showDpAt(bit: number, show: boolean) {
        if (show) dat(bit, dbuf[bit % 4] | 0x80)
        else dat(bit, dbuf[bit % 4] & 0x7F)
    }

    /**
     * set display intensity
     * @param dat is intensity of the display, eg: 3
     */
    //% blockId="TM650_INTENSITY" block="set intensity %dat"
    //% weight=70 blockGap=8
    export function setIntensity(dat: number) {
        if ((dat < 0) || (dat > 8))
            return;
        if (dat == 0)
            off()
        else {
            _intensity = dat
            cmd((dat << 4) | 0x01)
        }
    }

    on();
}
namespace Speech {

    const DATA_HEAD = 0xFD                  //帧头

    let I2C_ADDR = 0x30

    export enum I2C_ADDR_Select {
        //% blockId="NEW_ADDR" block="NEW_ADDR"
        NEW_ADDR = 0x30,
        //% blockId="OLD_ADDR" block="OLD_ADDR"  
        OLD_ADDR = 0x50
    }


    export enum EncodingFormat_Type {
        //% blockId="GB2312" block="GB2312"
        GB2312 = 0x00,
        //% blockId="GBK" block="GBK"  
        GBK = 0x01,
        //% blockId="BIG5" block="BIG5"        
        BIG5 = 0x02,
        //% blockId="UNICODE" block="UNICODE"        
        UNICODE = 0x03
    }


    //% blockId=Set_IICAddress block="Set_IICAddress|i2c_address %i2c_address"
    //% weight=99
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12  
    export function Set_IICAddress(i2c_address: I2C_ADDR_Select): void {
        I2C_ADDR = i2c_address;
    }



    function IIC_Writes(date: number[], size: number): void {

        for (let q = 0; q < size; q++) {
            pins.i2cWriteNumber(I2C_ADDR, date[q], NumberFormat.UInt8LE, false);
            basic.pause(10);
        }
    }

    //% blockId=Speech_Text block="Speech_Text|speech_text %speech_text"
    //% weight=99
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12  
    export function Speech_Text(speech_text: string): void {
        let num = speech_text.length + 2;
        let total_num = speech_text.length;
        let length_HH = num >> 8;
        let length_LL = num & 0xff;
        let commond = 0x01;

        let buf4: number[] = [DATA_HEAD, length_HH, length_LL, commond, 0x00];

        IIC_Writes(buf4, 5);

        for (let ch of speech_text) {
            pins.i2cWriteNumber(I2C_ADDR, ch.charCodeAt(0), NumberFormat.UInt8LE, false);
        }

        /*for(let i = 0;i < total_num;i++)
        {
            pins.i2cWriteNumber(I2C_ADDR,speech_text.charCodeAt(i), NumberFormat.UInt8LE, false);  
        }*/
    }



    export enum ChipStatus_Type {

        //% blockId="ChipStatus_InitSuccessful" block="ChipStatus_InitSuccessful"
        ChipStatus_InitSuccessful = 0x4A,
        //% blockId="ChipStatus_CorrectCommand" block="ChipStatus_CorrectCommand"
        ChipStatus_CorrectCommand = 0x41,
        //% blockId="ChipStatus_ErrorCommand" block="ChipStatus_ErrorCommand"
        ChipStatus_ErrorCommand = 0x45,
        //% blockId="ChipStatus_Busy" block="ChipStatus_Busy"
        ChipStatus_Busy = 0x4E,
        //% blockId="ChipStatus_Idle" block="ChipStatus_Idle"
        ChipStatus_Idle = 0x4F
    }

    //% blockId=GetChipStatus block="GetChipStatus"
    //% weight=99
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12  
    export function GetChipStatus(): number {
        let AskState: number[] = [DATA_HEAD, 0x00, 0x01, 0x21];

        IIC_Writes(AskState, 4);

        basic.pause(100);

        let result2 = pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8LE, false);
        return result2;

    }


    //% blockId=Wait_XFS_Status block="Wait_XFS_Status|status %status"
    //% weight=99
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12  
    export function Wait_XFS_Status(status: ChipStatus_Type): void {
        while (GetChipStatus() != status) {
            basic.pause(20);
        }

    }



    export enum Style_Type {
        //% blockId="Style_Single" block="Style_Single"
        Style_Single = 0,
        //% blockId="Style_Continue" block="Style_Continue"
        Style_Continue = 1
    }

    function SetBase(str: string): void {
        let num2 = str.length + 2;
        let total_num2 = str.length;
        let length_HH2 = num2 >> 8;
        let length_LL2 = num2 & 0xff;
        let commond2 = 0x01;

        let buf5: number[] = [DATA_HEAD, length_HH2, length_LL2, commond2, 0];

        IIC_Writes(buf5, 5);

        for (let r = 0; r < total_num2; r++) {
            pins.i2cWriteNumber(I2C_ADDR, str.charCodeAt(r), NumberFormat.UInt8LE, false);
        }

    }

    //% blockId=SetStyle block="SetStyle|style_type %style_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetStyle(style_type: Style_Type): void {

        if (style_type == 1) {
            SetBase("[f1]");
        }
        else {
            SetBase("[f0]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    export enum Language_Type {

        //% blockId="Language_Auto" block="Language_Auto"
        Language_Auto = 0,
        //% blockId="Language_Chinese" block="Language_Chinese"
        Language_Chinese,
        //% blockId="Language_English" block="Language_English"
        Language_English
    }

    //% blockId=SetLanguage block="SetLanguage|language_type %language_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetLanguage(language_type: Language_Type): void {

        if (language_type == 0) {
            SetBase("[g0]");
        }
        else if (language_type == 1) {
            SetBase("[g1]");
        }
        else if (language_type == 2) {
            SetBase("[g2]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }


    export enum Articulation_Type {

        //% blockId="Articulation_Auto" block="Articulation_Auto"
        Articulation_Auto = 0,
        //% blockId="Articulation_Letter" block="Articulation_Letter"
        Articulation_Letter,
        //% blockId="Articulation_Word" block="Articulation_Word"
        Articulation_Word
    }

    //% blockId=SetArticulation block="SetArticulation|articulation_type %articulation_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetArticulation(articulation_type: Articulation_Type): void {

        if (articulation_type == 0) {
            SetBase("[h0]");
        }
        else if (articulation_type == 1) {
            SetBase("[h1]");
        }
        else if (articulation_type == 2) {
            SetBase("[h2]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }


    export enum Spell_Type {

        //% blockId="Spell_Disable" block="Spell_Disable"
        Spell_Disable = 0,
        //% blockId="Spell_Enable" block="Spell_Enable"
        Spell_Enable
    }

    //% blockId=SetSpell block="SetSpell|spell_type %spell_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetSpell(spell_type: Spell_Type): void {

        if (spell_type == 0) {
            SetBase("[i0]");
        }
        else if (spell_type == 1) {
            SetBase("[i1]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }

    }


    export enum Reader_Type {

        //% blockId="Reader_XiaoYan" block="Reader_XiaoYan"
        Reader_XiaoYan = 3,
        //% blockId="Reader_XuJiu" block="Reader_XuJiu"
        Reader_XuJiu = 51,
        //% blockId="Reader_XuDuo" block="Reader_XuDuo"
        Reader_XuDuo = 52,
        //% blockId="Reader_XiaoPing" block="Reader_XiaoPing"
        Reader_XiaoPing = 53,
        //% blockId="Reader_DonaldDuck" block="Reader_DonaldDuck"
        Reader_DonaldDuck = 54,
        //% blockId="Reader_XuXiaoBao" block="Reader_XuXiaoBao"
        Reader_XuXiaoBao = 55
    }

    //% blockId=SetReader block="SetReader|reader_type %reader_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetReader(reader_type: Reader_Type): void {

        if (reader_type == 3) {
            SetBase("[m3]");
        }
        else if (reader_type == 51) {
            SetBase("[m51]");
        }
        else if (reader_type == 52) {
            SetBase("[m52]");
        }
        else if (reader_type == 53) {
            SetBase("[m53]");
        }
        else if (reader_type == 54) {
            SetBase("[m54]");
        }
        else if (reader_type == 55) {
            SetBase("[m55]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }

    }

    export enum NumberHandle_Type {

        //% blockId="NumberHandle_Auto" block="NumberHandle_Auto"
        NumberHandle_Auto = 0,
        //% blockId="NumberHandle_Number" block="NumberHandle_Number"
        NumberHandle_Number,
        //% blockId="NumberHandle_Value" block="NumberHandle_Value"
        NumberHandle_Value
    }

    //% blockId=SetNumberHandle block="SetNumberHandle|numberhandle_type %numberhandle_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetNumberHandle(numberhandle_type: NumberHandle_Type): void {

        if (numberhandle_type == 0) {
            SetBase("[n0]");
        }
        else if (numberhandle_type == 1) {
            SetBase("[n1]");
        }
        else if (numberhandle_type == 2) {
            SetBase("[n2]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    export enum ZeroPronunciation_Type {

        //% blockId="ZeroPronunciation_Zero" block="ZeroPronunciation_Zero"
        ZeroPronunciation_Zero = 0,
        //% blockId="ZeroPronunciation_O" block="ZeroPronunciation_O"
        ZeroPronunciation_O
    }

    //% blockId=SetZeroPronunciation block="SetZeroPronunciation|zeropronunciation_type %zeropronunciation_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetZeroPronunciation(zeropronunciation_type: ZeroPronunciation_Type): void {

        if (zeropronunciation_type == 0) {
            SetBase("[o0]");
        }
        else if (zeropronunciation_type == 1) {
            SetBase("[o1]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    export enum NamePronunciation_Type {

        //% blockId="NamePronunciation_Auto" block="NamePronunciation_Auto"
        NamePronunciation_Auto = 0,
        //% blockId="NamePronunciation_Constraint" block="NamePronunciation_Constraint"
        NamePronunciation_Constraint
    }

    //% blockId=SetNamePronunciation block="SetNamePronunciation|namepronunciation_type %namepronunciation_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetNamePronunciation(namepronunciation_type: NamePronunciation_Type): void {

        if (namepronunciation_type == 0) {
            SetBase("[r0]");
        }
        else if (namepronunciation_type == 1) {
            SetBase("[r1]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    //% blockId=SetSpeed block="SetSpeed|speed %speed"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetSpeed(speed: number): void {

        SetBase("[s" + speed + "]");
        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    //% blockId=SetIntonation block="SetIntonation|intonation %intonation"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetIntonation(intonation: number): void {

        SetBase("[t" + intonation + "]");
        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    //% blockId=SetVolume block="SetVolume|volume %volume"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetVolume(volume: number): void {

        SetBase("[v" + volume + "]");
        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    export enum OnePronunciation_Type {

        //% blockId="OnePronunciation_Yao" block="OnePronunciation_Yao"
        OnePronunciation_Yao = 0,
        //% blockId="OnePronunciation_Yi" block="OnePronunciation_Yi"
        OnePronunciation_Yi
    }

    //% blockId=SetOnePronunciation block="SetOnePronunciation|onepronunciation_type %onepronunciation_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetOnePronunciation(onepronunciation_type: OnePronunciation_Type): void {

        if (onepronunciation_type == 0) {
            SetBase("[y0]");
        }
        else if (onepronunciation_type == 1) {
            SetBase("[y1]");
        }

        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }


    export enum Rhythm_Type {

        //% blockId="Rhythm_Diasble" block="Rhythm_Diasble"
        Rhythm_Diasble = 0,
        //% blockId="Rhythm_Enable" block="Rhythm_Enable"
        Rhythm_Enable
    }

    //% blockId=SetRhythm block="SetRhythm|rhythm_type %rhythm_type"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetRhythm(rhythm_type: Rhythm_Type): void {

        if (rhythm_type == 0) {
            SetBase("[z0]");
        }
        else if (rhythm_type == 1) {
            SetBase("[z1]");
        }
        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }
    }

    //% blockId=SetRestoreDefault block="SetRestoreDefault"
    //% weight=92
    //% blockGap=10
    //% color="#3CB371"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function SetRestoreDefault(): void {

        SetBase("[d]");
        while (GetChipStatus() != 0x4F) {
            basic.pause(50);
        }

    }



}
