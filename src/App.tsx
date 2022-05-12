import React from "react";

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


type Articulo = {
    codigo: string;
    categoria: string;
    numserie: number;
    descripcion: string;
    modelo: string;
    marca: string;
    color: string;
    tipo: string; // Puede ser servicio , bien
    subTipo: string // vienes muebles y inmuebles Categoria muebles ||||| y las in muebles edificio etc
    foto: string;
    existe: boolean;
    responsable: string;
    costo: number
    equipoComputo: {
        so: string;
        ram: number;
    },
    creacion: Date
}


type EstacionTrabajo = {
    codigo: string;
    descripcion: string;
    responsable: string;
    responsableNumEmpleado: string;
    tipoEstacion: string;
    teclado: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    mouse: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    monitor: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    impresora: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    cpu: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    regulador: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    nobreacks: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    tplink: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    switch: {
        codigoInventario: string;
        marca: string;
        modelo: string;
        color: string;
        conexion: string;
        foto: string;
    },
    creacion: Date
}

const productSchema = buildSchema<Articulo>({
    name: "Articulos",
    properties: {
        codigo: {
            title: "Codigo",
            validation: {required: true},
            dataType: "string"
        },
        categoria: {
            title: "Categoria",
            validation: {required: true},
            dataType: "string",
            description: "Should this product be visible in the website",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            config: {
                enumValues: {
                    'EQUIPO_COMPUTO': "EQUIPO DE COMPUTO",
                    'EQUIPO_DE_OFICINA': "EQUIPO DE OFICINA",
                    'PAPELERIA': "PAPELERIA",
                }
            }
        },


        descripcion: {
            title: "Descripcion",
            description: "Not mandatory but it'd be awesome if you filled this up",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            dataType: "string",
            columnWidth: 300
        },

        modelo: {
            title: "Modelo",
            validation: {required: true},
            dataType: "string"
        },

        numserie: {
            title: "Num Serie",
            validation: {
                required: true,
                requiredMessage: "You must set a price between 0 and 1000",
                min: 0,
                max: 100000
            },
            description: "Price with range validation",
            dataType: "number"
        },


        marca: {
            title: "Marca",
            validation: {required: true},
            dataType: "string"
        },

        color: {
            title: "Color",
            validation: {required: true},
            dataType: "string"
        },

        tipo: {
            title: "Tipo",
            validation: {required: true},
            dataType: "string",
            description: "Should this product be visible in the website",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            config: {
                enumValues: {
                    'BIEN': "BIEN",
                    'SERVICIO': "SERVICIO",
                }
            }
        },

        subTipo: {
            title: "SubTipo",
            validation: {required: true},
            dataType: "string",
            description: "Should this product be visible in the website",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            config: {
                enumValues: {
                    'MUEBLE': "MUEBLE",
                    'INMUEBLE': "INMUEBLE",
                }
            }
        },


        foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
            title: "Foto",
            dataType: "string",
            config: {
                storageMeta: {
                    mediaType: "image",
                    storagePath: "images",
                    acceptedFiles: ["image/*"]
                }
            }
        }),

        existe: ({values}) => buildProperty({
            title: "Existe",
            dataType: "boolean",
            columnWidth: 100,
        }),

        responsable: {
            title: "SubTipo",
            validation: {required: true},
            dataType: "string",
            description: "Should this product be visible in the website",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            config: {
                enumValues: {
                    'MUEBLE': "MUEBLE",
                    'INMUEBLE': "INMUEBLE",
                }
            }
        },

        costo: {
            title: "Costo",
            validation: {
                required: true,
                requiredMessage: "You must set a price between 0 and 1000",
                min: 0,
                max: 100000
            },
            description: "Price with range validation",
            dataType: "number"
        },

        equipoComputo: {
            title: "Equipo de Computo",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                so: {
                    title: "SO",
                    dataType: "string"
                },
                ram: {
                    title: "RAM",
                    dataType: "number"
                }
            }
        },


        creacion: {
            title: "Creacion",
            dataType: "timestamp"
        }
    }
});

const estacionTrabajoSchema = buildSchema<EstacionTrabajo>({
    name: "Estacion de Trabajo",
    properties: {

        codigo: {
            title: "Codigo",
            validation: {required: true},
            dataType: "string"
        },

        descripcion: {
            title: "Descripcion",
            validation: {required: true},
            dataType: "string"
        },

        responsable: {
            title: "Responsable",
            validation: {required: true},
            dataType: "string"
        },

        responsableNumEmpleado: {
            title: "Num Empleado Responsable",
            validation: {required: true},
            dataType: "string"
        },

        tipoEstacion: {
            title: "TipoEstacion",
            validation: {required: true},
            dataType: "string"
        },

        teclado: {
            title: "Teclado",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },


        mouse: {
            title: "Mouse",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },


        monitor: {
            title: "Monitor",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        cpu: {
            title: "Cpu",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        impresora: {
            title: "impresora",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        regulador: {
            title: "regulador",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        nobreacks: {
            title: "nobreack",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        tplink: {
            title: "tplink",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        switch: {
            title: "switch",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                codigoInventario: {
                    title: "Codigo Inventario",
                    dataType: "string"
                },
                marca: {
                    title: "Marca",
                    dataType: "string"
                },
                modelo: {
                    title: "Modelo",
                    dataType: "string"
                },
                color: {
                    title: "Color",
                    dataType: "string"
                },
                conexion: {
                    title: "Conexion",
                    dataType: "string"
                },
                foto: buildProperty({ // The `buildProperty` method is an utility function used for type checking
                    title: "Foto",
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
        },

        creacion: {
            title: "Creacion",
            dataType: "timestamp"
        }

    }
});


const articulosCollection = buildCollection<Articulo>({
    path: "articulos",
    schema: productSchema,
    name: "Articulos",
    group: "Main",
    description: "List of the products currently sold in our shop",
    textSearchEnabled: true,
    // additionalColumns: [productAdditionalColumn], // Example below

    permissions: ({user, authController}) => ({
        edit: true,
        create: true,
        delete: false
    }),
    excludedProperties: ["related_products"]
});


const estacionesTrabajosCollection = buildCollection<EstacionTrabajo>({
    path: "estaciones",
    schema: estacionTrabajoSchema,
    name: "Estaciones de Trabajo",
    group: "Main",
    description: "List of the products currently sold in our shop",
    textSearchEnabled: true,
    // additionalColumns: [productAdditionalColumn], // Example below


    permissions: ({user, authController}) => ({
        edit: true,
        create: true,
        delete: true
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

                articulosCollection,
                estacionesTrabajosCollection
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
        name={"SCA"}
        authentication={myAuthenticator}
        navigation={navigation}
        firebaseConfig={firebaseConfig}
    />;
}
