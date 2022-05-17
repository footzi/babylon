import {
    Scene,
    PointerEventTypes,
    PointerInfo,
    Camera,
    Vector3,
} from 'babylonjs';

export class MouseDrag {
    static init(scene: Scene, camera: Camera) {
        // scene.detachControl();

        setTimeout(() => {
            console.log(camera.position);
            // camera.position = new Vector3(0, 0, 0);
            // camera.position = Vector3.Lerp(
            //     camera.position,
            //     new Vector3(30, 10, 10),
            //     0.05,
            // );

            // camera.setPosition();
        }, 2000);

        scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
            console.log(pointerInfo);
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    console.log('POINTER DOWN');
                    break;
                case PointerEventTypes.POINTERUP:
                    console.log('POINTER UP');
                    break;
                case PointerEventTypes.POINTERMOVE:
                    console.log('POINTER MOVE');

                    pointerInfo.event.preventDefault();
                    // pointerInfo.event();

                    break;
                case PointerEventTypes.POINTERWHEEL:
                    console.log('POINTER WHEEL');
                    break;
                case PointerEventTypes.POINTERPICK:
                    console.log('POINTER PICK');
                    break;
                case PointerEventTypes.POINTERTAP:
                    console.log('POINTER TAP');
                    break;
                case PointerEventTypes.POINTERDOUBLETAP:
                    console.log('POINTER DOUBLE-TAP');
                    break;
            }
        });
    }
}
