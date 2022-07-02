import React from "react";
import logo from "./pina.png";
import {User as FirebaseUser} from "firebase/auth";
import {
    Authenticator,
    buildCollection,
    buildProperty,
    buildSchema,
    EntityReference,
    FirebaseCMSApp,
    NavigationBuilder,
    NavigationBuilderProps
} from "@camberi/firecms";

import "typeface-rubik";
import "typeface-space-mono";

// TODO: Replace with your config
const firebaseConfig = {
    apiKey: "AIzaSyAGJby9c6lG1gYrt_eTFEk_BUIYKcr210g",
    authDomain: "tuxtepec-8dd4d.firebaseapp.com",
    databaseURL: "https://tuxtepec-8dd4d-default-rtdb.firebaseio.com",
    projectId: "tuxtepec-8dd4d",
    storageBucket: "tuxtepec-8dd4d.appspot.com",
    messagingSenderId: "1066991036306",
    appId: "1:1066991036306:web:641cbe0fc7c0eb6434c34b",
    measurementId: "G-B5PJYN6FLX"
};


type Contratos = {
    descripcion: string
    descripcionLarga: string
    fotos: { downloadURL: string }[]
}

const contratoSchema = buildSchema<Contratos>({
    name: "Contratos",
    properties: {
        descripcion: {
            title: "Descripción",
            dataType: "string",
            disabled: true
        },
        descripcionLarga: {
            title: "Descripción Larga",
            dataType: "string"
        },
        fotos: {
            title: "Fotos",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    downloadURL: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                        title: "Imagen",
                        dataType: "string",
                        config: {
                            storageMeta: {
                                mediaType: "image",
                                storagePath: "images",
                                acceptedFiles: ["image/*"]
                            }
                        }
                    }),
                }
            }
        },
    }
});

const contratosCollection = buildCollection<Contratos>({
    path: "contratos",
    schema: contratoSchema,
    name: "Contratos",
    group: "Main",
    description: "Contratos de obras de bienestar",
    textSearchEnabled: true,
    // additionalColumns: [productAdditionalColumn], // Example below

    permissions: ({user, authController}) => ({
        edit: true,
        create: true,
        delete: false
    }),
    excludedProperties: ["related_products"]
});






export default function App() {

    const navigation: NavigationBuilder = async ({
                                                     user,
                                                     authController
                                                 }: NavigationBuilderProps) => {

        return ({
            collections: [
                contratosCollection
            ]
        });
    };

    const myAuthenticator: Authenticator<FirebaseUser> = async ({
                                                                    user,
                                                                    authController
                                                                }) => {
        // You can throw an error to display a message
        if (user?.email?.includes("flanders")) {
            throw Error("Stupid Flanders!");
        }

        console.log("Allowing access to", user?.email);
        // This is an example of retrieving async data related to the user
        // and storing it in the user extra field.
        const sampleUserData = {
            roles: ["admin"]
        };
        authController.setExtra(sampleUserData);
        return true;
    };

    return <FirebaseCMSApp
        name={"Modulo Comunicación"}
        authentication={myAuthenticator}
        logo={logo}
        navigation={navigation}
        firebaseConfig={firebaseConfig}
    />;
}
