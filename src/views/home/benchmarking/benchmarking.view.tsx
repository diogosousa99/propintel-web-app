import { ModuleTitle } from '@components/module-title.component';
import { Map } from '@components/map.component';
import { useMemo, useState } from 'react';
import { Label } from '@components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@components/ui/select';
import { Button } from '@components/ui/button';
import React from 'react';
import { useMyPropertiesViewModel } from '../my-properties/list/hooks/use-my-properties-view-model.hook';

const data = [
    {
        id: 681,
        price: 2275000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua dos Hibiscos, 57',
        latitude: 37.0894299,
        longitude: -8.7437919,
        province: 'Faro',
        subtitle: 'Luz, Lagos',
        title: 'Detached house in rua dos Hibiscos, 57',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 2,
    },
    {
        id: 682,
        price: 2200000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua dos Hibiscos, 57',
        latitude: 37.0894299,
        longitude: -8.7437919,
        province: 'Faro',
        subtitle: 'Luz, Lagos',
        title: 'Detached house in rua dos Hibiscos, 57',
        type: 'sale',
        propertyType: 'flat',
        rooms: 2,
    },
    {
        id: 683,
        price: 2400000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua dos Hibiscos, 57',
        latitude: 37.0894299,
        longitude: -8.7437919,
        province: 'Faro',
        subtitle: 'Luz, Lagos',
        title: 'Detached house in rua dos Hibiscos, 57',
        type: 'sale',
        propertyType: 'studio',
        rooms: 2,
    },
    {
        id: 684,
        price: 850000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Pereira Henriques, 618',
        latitude: 38.7406703,
        longitude: -9.1027073,
        province: 'Lisboa',
        subtitle: 'Marvila, Lisboa',
        title: 'Flat in rua Pereira Henriques, 618',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 4,
    },
    {
        id: 685,
        price: 354000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'do Azevinho no number',
        latitude: 38.4855625,
        longitude: -9.1234375,
        province: 'Setúbal',
        subtitle: 'Castelo (Sesimbra), Sesimbra',
        title: 'Flat in do Azevinho no number',
        type: 'sale',
        propertyType: 'room',
        rooms: 2,
    },
    {
        id: 686,
        price: 749000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'João Chagas no number',
        latitude: 38.4888825,
        longitude: -9.1023216,
        province: 'Setúbal',
        subtitle: 'Castelo (Sesimbra), Sesimbra',
        title: 'Detached house in João Chagas no number',
        type: 'sale',
        propertyType: 'countryHouse',
        rooms: 0,
    },
    {
        id: 687,
        price: 630000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Santa Eufémia',
        latitude: 41.1885922,
        longitude: -8.6692027,
        province: 'Porto',
        subtitle: 'Matosinhos e Leça da Palmeira, Matosinhos',
        title: 'House in rua Santa Eufémia',
        type: 'sale',
        propertyType: 'countryHouse',
        rooms: 1,
    },
    {
        id: 688,
        price: 695000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'estrada Alagoa, 257',
        latitude: 38.6944853,
        longitude: -9.3385537,
        province: 'Lisboa',
        subtitle: 'Carcavelos e Parede, Cascais',
        title: 'Flat in estrada Alagoa, 257',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 3,
    },
    {
        id: 689,
        price: 265000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua da Quinta de São Romão, 2',
        latitude: 39.7366478,
        longitude: -8.7922079,
        province: 'Leiria',
        subtitle: 'Leiria - Pousos - Barreira e Cortes, Leiria',
        title: 'Flat in rua da Quinta de São Romão, 2',
        type: 'sale',
        propertyType: 'flat',
        rooms: 1,
    },
    {
        id: 690,
        price: 279999,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Doutor Fialho de Almeida no number',
        latitude: 41.5362234,
        longitude: -8.4425387,
        province: 'Braga',
        subtitle: 'Ferreiros e Gondizalves, Braga',
        title: 'Flat in rua Doutor Fialho de Almeida no number',
        type: 'sale',
        propertyType: 'garage',
        rooms: 4,
    },
    {
        id: 691,
        price: 520000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Padre Luís Germano, 27',
        latitude: 38.8930472,
        longitude: -9.2097882,
        province: 'Lisboa',
        subtitle: 'Lousa, Loures',
        title: 'Terraced house in rua Padre Luís Germano, 27',
        type: 'sale',
        propertyType: 'office',
        rooms: 0,
    },
    {
        id: 692,
        price: 1700000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Eugénio dos Santos, Torre Londres, 15',
        latitude: 38.6903227,
        longitude: -9.3247847,
        province: 'Lisboa',
        subtitle: 'Nova Oeiras - Quinta das Palmeiras, Oeiras',
        title: 'Flat in rua Eugénio dos Santos, Torre Londres, 15',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 1,
    },
    {
        id: 693,
        price: 2050000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua da Areia 355, Unidade 28, 2750-053, Cascais e Estoril, Cascais, Lisboa, 355',
        latitude: 38.7179,
        longitude: -9.46195,
        province: 'Lisboa',
        subtitle: 'Areia - Birre, Cascais',
        title: 'Detached house in rua da Areia 355, Unidade 28, 2750-053, Cascais e Estoril, Cascais, Lisboa, 355',
        type: 'sale',
        propertyType: 'duplex',
        rooms: 0,
    },
    {
        id: 694,
        price: 1980000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'largo Doutor Passos Vella, 6',
        latitude: 38.6974803,
        longitude: -9.4230516,
        province: 'Lisboa',
        subtitle: 'Centro de Cascais, Cascais',
        title: 'Andar de moradia in largo Doutor Passos Vella, 6',
        type: 'sale',
        propertyType: 'studio',
        rooms: 1,
    },
    {
        id: 695,
        price: 698000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'campo de Santa Clara, 140',
        latitude: 38.7159826,
        longitude: -9.1251599,
        province: 'Lisboa',
        subtitle: 'São Vicente, Lisboa',
        title: 'Flat in campo de Santa Clara, 140',
        type: 'sale',
        propertyType: 'studio',
        rooms: 3,
    },
    {
        id: 696,
        price: 1650000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Almada Negreiros, 8 ------a',
        latitude: 38.7164512,
        longitude: -9.2578044,
        province: 'Lisboa',
        subtitle: 'Carnaxide e Queijas, Oeiras',
        title: 'Detached house in rua Almada Negreiros, 8 ------a',
        type: 'sale',
        propertyType: 'garage',
        rooms: 4,
    },
    {
        id: 697,
        price: 2798000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Carreira de Tiro, 53',
        latitude: 38.7414302,
        longitude: -9.296085,
        province: 'Lisboa',
        subtitle: 'Barcarena, Oeiras',
        title: 'Detached house in rua Carreira de Tiro, 53',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 1,
    },
    {
        id: 698,
        price: 1250000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Centro - Santo Amaro',
        latitude: 38.6905671,
        longitude: -9.3123955,
        province: 'Lisboa',
        subtitle: 'Centro - Santo Amaro, Oeiras',
        title: 'Detached house',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 4,
    },
    {
        id: 699,
        price: 2500000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Joaquim Ereira, 413',
        latitude: 38.7014971,
        longitude: -9.4308073,
        province: 'Lisboa',
        subtitle: 'Bairro do Rosário, Cascais',
        title: 'Detached house in rua Joaquim Ereira, 413',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 4,
    },
    {
        id: 700,
        price: 715000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Oleiros, 4',
        latitude: 38.5129519,
        longitude: -9.0214954,
        province: 'Setúbal',
        subtitle: 'Azeitão, Setúbal',
        title: 'Detached house in Oleiros, 4',
        type: 'sale',
        propertyType: 'countryHouse',
        rooms: 4,
    },
    {
        id: 701,
        price: 440000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua da Juventude',
        latitude: 37.1313253,
        longitude: -8.5433645,
        province: 'Faro',
        subtitle: 'Amparo - Alto do Quintão, Portimão',
        title: 'Flat in rua da Juventude',
        type: 'sale',
        propertyType: 'countryHouse',
        rooms: 2,
    },
    {
        id: 702,
        price: 460000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Ceuta, 29',
        latitude: 38.7145999,
        longitude: -9.2361364,
        province: 'Lisboa',
        subtitle: 'Algés - Linda-a-Velha - Cruz Quebrada - Dafundo, Oeiras',
        title: 'Flat in rua de Ceuta, 29',
        type: 'sale',
        propertyType: 'garage',
        rooms: 3,
    },
    {
        id: 703,
        price: 845000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'avenida Menéres, 215',
        latitude: 41.1784962,
        longitude: -8.6899226,
        province: 'Porto',
        subtitle: 'Matosinhos e Leça da Palmeira, Matosinhos',
        title: 'Flat in avenida Menéres, 215',
        type: 'sale',
        propertyType: 'duplex',
        rooms: 3,
    },
    {
        id: 704,
        price: 1250000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Brasil',
        latitude: 37.0926652,
        longitude: -8.1076289,
        province: 'Faro',
        subtitle: 'Hilton - Rua do Brasil, Loulé',
        title: 'Detached house in rua do Brasil',
        type: 'sale',
        propertyType: 'room',
        rooms: 1,
    },
    {
        id: 705,
        price: 1450000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Melvin Jones',
        latitude: 37.0864132,
        longitude: -8.1058668,
        province: 'Faro',
        subtitle: 'Pinhal da Marina, Loulé',
        title: 'Detached house in rua Melvin Jones',
        type: 'sale',
        propertyType: 'studio',
        rooms: 2,
    },
    {
        id: 706,
        price: 750000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Coelho da Rocha, 46',
        latitude: 38.7166227,
        longitude: -9.1634673,
        province: 'Lisboa',
        subtitle: 'Campo de Ourique, Lisboa',
        title: 'Flat in rua Coelho da Rocha, 46',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 3,
    },
    {
        id: 707,
        price: 440000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Cruz das Mestras, 27',
        latitude: 37.0192056,
        longitude: -7.9328923,
        province: 'Faro',
        subtitle: 'Faro',
        title: 'Flat in rua Cruz das Mestras, 27',
        type: 'sale',
        propertyType: 'studio',
        rooms: 4,
    },
    {
        id: 708,
        price: 430000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'largo de São Francisco, 1',
        latitude: 37.0132067,
        longitude: -7.9327746,
        province: 'Faro',
        subtitle: 'Faro',
        title: 'Flat in largo de São Francisco, 1',
        type: 'sale',
        propertyType: 'flat',
        rooms: 3,
    },
    {
        id: 709,
        price: 1980000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Humberto Delgado',
        latitude: 38.7314761,
        longitude: -9.4390518,
        province: 'Lisboa',
        subtitle: 'Alcabideche, Cascais',
        title: 'Detached house in rua Humberto Delgado',
        type: 'sale',
        propertyType: 'duplex',
        rooms: 4,
    },
    {
        id: 710,
        price: 480000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Covelo no number',
        latitude: 41.3147791,
        longitude: -8.723015,
        province: 'Porto',
        subtitle: 'Mindelo, Vila do Conde',
        title: 'Detached house in rua do Covelo no number',
        type: 'sale',
        propertyType: 'garage',
        rooms: 4,
    },
    {
        id: 711,
        price: 330000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Meadela',
        latitude: 41.6997677,
        longitude: -8.8080502,
        province: 'Viana do Castelo',
        subtitle: 'Viana do Castelo e Meadela, Viana do Castelo',
        title: 'House',
        type: 'sale',
        propertyType: 'garage',
        rooms: 0,
    },
    {
        id: 712,
        price: 850000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'avenida António Augusto de Aguiar, 29',
        latitude: 38.7323566,
        longitude: -9.1525835,
        province: 'Lisboa',
        subtitle: 'Avenidas Novas, Lisboa',
        title: 'Flat in avenida António Augusto de Aguiar, 29',
        type: 'sale',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 713,
        price: 430000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Herculano Nunes, 7',
        latitude: 38.7004996,
        longitude: -9.3755158,
        province: 'Lisboa',
        subtitle: 'Areias, Cascais',
        title: 'Flat in rua Herculano Nunes, 7',
        type: 'sale',
        propertyType: 'garage',
        rooms: 4,
    },
    {
        id: 714,
        price: 1150000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Engenheiro José Frederico Ulrich, 6',
        latitude: 38.7112508,
        longitude: -9.2391618,
        province: 'Lisboa',
        subtitle: 'Algés - Linda-a-Velha - Cruz Quebrada - Dafundo, Oeiras',
        title: 'Detached house in rua Engenheiro José Frederico Ulrich, 6',
        type: 'sale',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 715,
        price: 2475000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Dom Francisco de Almeida, 45',
        latitude: 38.6995551,
        longitude: -9.2178357,
        province: 'Lisboa',
        subtitle: 'Belém, Lisboa',
        title: 'Semi-detached house in rua Dom Francisco de Almeida, 45',
        type: 'sale',
        propertyType: 'duplex',
        rooms: 4,
    },
    {
        id: 716,
        price: 350000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua José Diogo da Silva, 7',
        latitude: 38.6919962,
        longitude: -9.3134601,
        province: 'Lisboa',
        subtitle: 'Centro - Santo Amaro, Oeiras',
        title: 'Flat in rua José Diogo da Silva, 7',
        type: 'sale',
        propertyType: 'countryHouse',
        rooms: 0,
    },
    {
        id: 717,
        price: 1075000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'estrada Rebelva no number A',
        latitude: 38.6990383,
        longitude: -9.3411819,
        province: 'Lisboa',
        subtitle: 'Carcavelos e Parede, Cascais',
        title: 'Semi-detached house in estrada Rebelva no number a',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 0,
    },
    {
        id: 718,
        price: 1199000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'quinta Grande, 41',
        latitude: 38.7356678,
        longitude: -9.2218058,
        province: 'Lisboa',
        subtitle: 'Alfragide, Amadora',
        title: 'Terraced house in quinta Grande, 41',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 2,
    },
    {
        id: 719,
        price: 415000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Professor Ofélia da Cruz Costa, 597',
        latitude: 41.2532241,
        longitude: -8.7205339,
        province: 'Porto',
        subtitle: 'Perafita - Lavra - Santa Cruz do Bispo, Matosinhos',
        title: 'Flat in rua Professor Ofélia da Cruz Costa, 597',
        type: 'sale',
        propertyType: 'office',
        rooms: 4,
    },
    {
        id: 720,
        price: 1450000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Birre, 80',
        latitude: 38.7162866,
        longitude: -9.4408327,
        province: 'Lisboa',
        subtitle: 'Areia - Birre, Cascais',
        title: 'Detached house in rua Birre, 80',
        type: 'sale',
        propertyType: 'flat',
        rooms: 1,
    },
    {
        id: 721,
        price: 900000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Silval, 39',
        latitude: 38.7072605,
        longitude: -9.3032259,
        province: 'Lisboa',
        subtitle: 'Cacilhas, Oeiras',
        title: 'Flat in rua Silval, 39',
        type: 'sale',
        propertyType: 'countryHouse',
        rooms: 4,
    },
    {
        id: 722,
        price: 2180000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'avenida Pedro Álvares Cabral, 110',
        latitude: 38.6971176,
        longitude: -9.4326523,
        province: 'Lisboa',
        subtitle: 'Bairro do Rosário, Cascais',
        title: 'Detached house in avenida Pedro Álvares Cabral, 110',
        type: 'sale',
        propertyType: 'garage',
        rooms: 3,
    },
    {
        id: 723,
        price: 525000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Infantaria 16, 121',
        latitude: 38.7181625,
        longitude: -9.169296,
        province: 'Lisboa',
        subtitle: 'Campo de Ourique, Lisboa',
        title: 'Flat in rua Infantaria 16, 121',
        type: 'sale',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 724,
        price: 845000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Borja, 63',
        latitude: 38.7108546,
        longitude: -9.1691498,
        province: 'Lisboa',
        subtitle: 'Estrela, Lisboa',
        title: 'Flat in rua do Borja, 63',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 2,
    },
    {
        id: 725,
        price: 735000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Vila Nogueira de Azeitão',
        latitude: 38.5242764,
        longitude: -9.0276639,
        province: 'Setúbal',
        subtitle: 'Azeitão, Setúbal',
        title: 'Detached house',
        type: 'sale',
        propertyType: 'penthouse',
        rooms: 0,
    },
    {
        id: 726,
        price: 285000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Aníbal Cunha',
        latitude: 41.1558813,
        longitude: -8.6196425,
        province: 'Porto',
        subtitle: 'Cedofeita, Porto',
        title: 'Flat in rua de Aníbal Cunha',
        type: 'sale',
        propertyType: 'room',
        rooms: 3,
    },
    {
        id: 727,
        price: 809000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'avenida Carolina Michaelis',
        latitude: 38.7163217,
        longitude: -9.2375601,
        province: 'Lisboa',
        subtitle: 'Algés - Linda-a-Velha - Cruz Quebrada - Dafundo, Oeiras',
        title: 'Flat in avenida Carolina Michaelis',
        type: 'sale',
        propertyType: 'duplex',
        rooms: 2,
    },
    {
        id: 728,
        price: 750000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'casal de Bolinhos',
        latitude: 38.5347346,
        longitude: -9.0286477,
        province: 'Setúbal',
        subtitle: 'Azeitão, Setúbal',
        title: 'Detached house in casal de Bolinhos',
        type: 'sale',
        propertyType: 'duplex',
        rooms: 4,
    },
    {
        id: 729,
        price: 235000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Ferrer Trindade, 5',
        latitude: 38.6618959,
        longitude: -9.0625912,
        province: 'Setúbal',
        subtitle: 'Alto do Seixalinho - Santo André - Verderena, Barreiro',
        title: 'Flat in rua Ferrer Trindade, 5',
        type: 'sale',
        propertyType: 'garage',
        rooms: 4,
    },
    {
        id: 730,
        price: 610000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Luciano Cordeiro, 116',
        latitude: 38.7276462,
        longitude: -9.1463179,
        province: 'Lisboa',
        subtitle: 'Santo António, Lisboa',
        title: 'Flat in rua Luciano Cordeiro, 116',
        type: 'sale',
        propertyType: 'flat',
        rooms: 0,
    },
    {
        id: 731,
        price: 2600,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Professor Doutor Manuel Eugénio Machado Macedo',
        latitude: 38.7158005,
        longitude: -9.3815235,
        province: 'Lisboa',
        subtitle: 'Alto dos Gaios, Cascais',
        title: 'Flat in rua Professor Doutor Manuel Eugénio Machado Macedo',
        type: 'rent',
        propertyType: 'office',
        rooms: 3,
    },
    {
        id: 732,
        price: 750,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'avenida de Lisboa, 52',
        latitude: 38.800189,
        longitude: -9.2285059,
        province: 'Lisboa',
        subtitle: 'Casal de Cambra, Sintra',
        title: 'T0 in avenida de Lisboa, 52',
        type: 'rent',
        propertyType: 'penthouse',
        rooms: 4,
    },
    {
        id: 733,
        price: 4500,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Golférias - Honório',
        latitude: 37.0771351,
        longitude: -8.1043936,
        province: 'Faro',
        subtitle: 'Golférias - Honório, Loulé',
        title: 'Detached house',
        type: 'rent',
        propertyType: 'garage',
        rooms: 0,
    },
    {
        id: 734,
        price: 2700,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Telheiras',
        latitude: 38.7675533,
        longitude: -9.1816144,
        province: 'Lisboa',
        subtitle: 'Carnide, Lisboa',
        title: 'Flat',
        type: 'rent',
        propertyType: 'countryHouse',
        rooms: 4,
    },
    {
        id: 735,
        price: 4000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'largo de Soares dos Reis',
        latitude: 41.1455898,
        longitude: -8.5968527,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in largo de Soares dos Reis',
        type: 'rent',
        propertyType: 'chalet',
        rooms: 1,
    },
    {
        id: 736,
        price: 3950,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua da Misericórdia',
        latitude: 38.7128341,
        longitude: -9.1436195,
        province: 'Lisboa',
        subtitle: 'Misericórdia, Lisboa',
        title: 'Flat in rua da Misericórdia',
        type: 'rent',
        propertyType: 'penthouse',
        rooms: 0,
    },
    {
        id: 737,
        price: 3250,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua dos Campos',
        latitude: 38.4661109,
        longitude: -9.176898,
        province: 'Setúbal',
        subtitle: 'Castelo (Sesimbra), Sesimbra',
        title: 'Andar de moradia in rua dos Campos',
        type: 'rent',
        propertyType: 'garage',
        rooms: 0,
    },
    {
        id: 738,
        price: 3200,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Dona Filipa de Vilhena',
        latitude: 38.7386744,
        longitude: -9.1420921,
        province: 'Lisboa',
        subtitle: 'Areeiro, Lisboa',
        title: 'Flat in rua Dona Filipa de Vilhena',
        type: 'rent',
        propertyType: 'office',
        rooms: 0,
    },
    {
        id: 739,
        price: 2160,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Doutor Almada Guerra',
        latitude: 38.7988511,
        longitude: -9.3788599,
        province: 'Lisboa',
        subtitle: 'Sintra',
        title: 'Flat in rua Doutor Almada Guerra',
        type: 'rent',
        propertyType: 'countryHouse',
        rooms: 2,
    },
    {
        id: 740,
        price: 2800,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Passos Manuel',
        latitude: 41.1482996,
        longitude: -8.6048613,
        province: 'Porto',
        subtitle: 'Batalha - Poveiros, Porto',
        title: 'Flat in rua de Passos Manuel',
        type: 'rent',
        propertyType: 'office',
        rooms: 4,
    },
    {
        id: 741,
        price: 2160,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Vera Cruz',
        latitude: 38.6866579,
        longitude: -9.3074673,
        province: 'Lisboa',
        subtitle: 'Centro - Santo Amaro, Oeiras',
        title: 'Flat in rua de Vera Cruz',
        type: 'rent',
        propertyType: 'studio',
        rooms: 2,
    },
    {
        id: 742,
        price: 2160,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Duque',
        latitude: 38.7143524,
        longitude: -9.1413945,
        province: 'Lisboa',
        subtitle: 'Santa Maria Maior, Lisboa',
        title: 'Flat in rua do Duque',
        type: 'rent',
        propertyType: 'flat',
        rooms: 1,
    },
    {
        id: 743,
        price: 2160,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'beco Arciprestes',
        latitude: 38.7087226,
        longitude: -9.1446142,
        province: 'Lisboa',
        subtitle: 'Misericórdia, Lisboa',
        title: 'Flat in beco Arciprestes',
        type: 'rent',
        propertyType: 'studio',
        rooms: 4,
    },
    {
        id: 744,
        price: 2000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'travessa Dom Vasco',
        latitude: 38.7049826,
        longitude: -9.1964578,
        province: 'Lisboa',
        subtitle: 'Ajuda, Lisboa',
        title: 'Flat in travessa Dom Vasco',
        type: 'rent',
        propertyType: 'office',
        rooms: 0,
    },
    {
        id: 745,
        price: 1800,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua gil Eanes',
        latitude: 37.1364266,
        longitude: -7.5935375,
        province: 'Faro',
        subtitle: 'Conceição e Cabanas de Tavira, Tavira',
        title: 'Flat in rua gil Eanes',
        type: 'rent',
        propertyType: 'penthouse',
        rooms: 2,
    },
    {
        id: 746,
        price: 1975,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Vilar',
        latitude: 41.1504639,
        longitude: -8.6297871,
        province: 'Porto',
        subtitle: 'Lordelo do Ouro e Massarelos, Porto',
        title: 'Flat in rua de Vilar',
        type: 'rent',
        propertyType: 'garage',
        rooms: 2,
    },
    {
        id: 747,
        price: 1769,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Calçada dos Barbadinhos',
        latitude: 38.721255,
        longitude: -9.121053,
        province: 'Lisboa',
        subtitle: 'São Vicente, Lisboa',
        title: 'Flat in Calçada dos Barbadinhos',
        type: 'rent',
        propertyType: 'flat',
        rooms: 0,
    },
    {
        id: 748,
        price: 1750,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Álvares Cabral',
        latitude: 41.1540073,
        longitude: -8.6140142,
        province: 'Porto',
        subtitle: 'Praça da República, Porto',
        title: 'Flat in rua de Álvares Cabral',
        type: 'rent',
        propertyType: 'studio',
        rooms: 2,
    },
    {
        id: 749,
        price: 1750,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Álvares Cabral',
        latitude: 41.1559543,
        longitude: -8.6172346,
        province: 'Porto',
        subtitle: 'Praça da República, Porto',
        title: 'Flat in rua de Álvares Cabral',
        type: 'rent',
        propertyType: 'penthouse',
        rooms: 3,
    },
    {
        id: 750,
        price: 1730,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Particular João Félix',
        latitude: 41.1338064,
        longitude: -8.6099787,
        province: 'Porto',
        subtitle: 'Santa Marinha e São Pedro da Afurada, Vila Nova de Gaia',
        title: 'Flat in rua Particular João Félix',
        type: 'rent',
        propertyType: 'office',
        rooms: 2,
    },
    {
        id: 751,
        price: 1665,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Marques da Silva',
        latitude: 38.7311445,
        longitude: -9.1316926,
        province: 'Lisboa',
        subtitle: 'Alameda - Praça do Chile - Almirante Reis, Lisboa',
        title: 'Flat in rua Marques da Silva',
        type: 'rent',
        propertyType: 'penthouse',
        rooms: 3,
    },
    {
        id: 752,
        price: 1665,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Mário Cesariny',
        latitude: 38.7457288,
        longitude: -9.1548769,
        province: 'Lisboa',
        subtitle: 'Avenidas Novas, Lisboa',
        title: 'Flat in rua Mário Cesariny',
        type: 'rent',
        propertyType: 'flat',
        rooms: 1,
    },
    {
        id: 753,
        price: 1665,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Delfim de Brito Guimarães',
        latitude: 38.7391273,
        longitude: -9.1632888,
        province: 'Lisboa',
        subtitle: 'Campolide, Lisboa',
        title: 'Flat in rua Delfim de Brito Guimarães',
        type: 'rent',
        propertyType: 'studio',
        rooms: 4,
    },
    {
        id: 754,
        price: 1665,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Delfim de Brito Guimarães',
        latitude: 38.7391193,
        longitude: -9.1632753,
        province: 'Lisboa',
        subtitle: 'Campolide, Lisboa',
        title: 'Flat in rua Delfim de Brito Guimarães',
        type: 'rent',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 755,
        price: 1600,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Passos Manuel',
        latitude: 41.1470298,
        longitude: -8.6034004,
        province: 'Porto',
        subtitle: 'Batalha - Poveiros, Porto',
        title: 'Flat in rua de Passos Manuel',
        type: 'rent',
        propertyType: 'duplex',
        rooms: 4,
    },
    {
        id: 756,
        price: 1600,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Passos Manuel',
        latitude: 41.1465632,
        longitude: -8.6061107,
        province: 'Porto',
        subtitle: 'Batalha - Poveiros, Porto',
        title: 'Flat in rua de Passos Manuel',
        type: 'rent',
        propertyType: 'duplex',
        rooms: 1,
    },
    {
        id: 757,
        price: 1600,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Santa Marta',
        latitude: 38.7217308,
        longitude: -9.1459564,
        province: 'Lisboa',
        subtitle: 'Santo António, Lisboa',
        title: 'Flat in rua de Santa Marta',
        type: 'rent',
        propertyType: 'chalet',
        rooms: 0,
    },
    {
        id: 758,
        price: 1559,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Serpa Pinto',
        latitude: 39.2369965,
        longitude: -8.681641,
        province: 'Santarém',
        subtitle: 'Cidade de Santarém, Santarém',
        title: 'Flat in rua Serpa Pinto',
        type: 'rent',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 759,
        price: 1510,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua 35',
        latitude: 41.005042,
        longitude: -8.6363489,
        province: 'Aveiro',
        subtitle: 'Espinho',
        title: 'Flat in rua 35',
        type: 'rent',
        propertyType: 'office',
        rooms: 1,
    },
    {
        id: 760,
        price: 1455,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua Passos Manuel',
        latitude: 38.7286535,
        longitude: -9.1353378,
        province: 'Lisboa',
        subtitle: 'Estefânia, Lisboa',
        title: 'Flat in rua Passos Manuel',
        type: 'rent',
        propertyType: 'garage',
        rooms: 2,
    },
    {
        id: 761,
        price: 1510,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Afonso Baldaia',
        latitude: 41.1577485,
        longitude: -8.6747098,
        province: 'Porto',
        subtitle: 'Aldoar - Foz do Douro - Nevogilde, Porto',
        title: 'Flat in rua de Afonso Baldaia',
        type: 'rent',
        propertyType: 'studio',
        rooms: 2,
    },
    {
        id: 762,
        price: 1400,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Passos Manuel',
        latitude: 41.1476226,
        longitude: -8.6040909,
        province: 'Porto',
        subtitle: 'Batalha - Poveiros, Porto',
        title: 'Flat in rua de Passos Manuel',
        type: 'rent',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 763,
        price: 1400,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Passos Manuel',
        latitude: 41.1450753,
        longitude: -8.6037562,
        province: 'Porto',
        subtitle: 'Batalha - Poveiros, Porto',
        title: 'Flat in rua de Passos Manuel',
        type: 'rent',
        propertyType: 'room',
        rooms: 1,
    },
    {
        id: 764,
        price: 1400,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Passos Manuel',
        latitude: 41.1452234,
        longitude: -8.6044747,
        province: 'Porto',
        subtitle: 'Batalha - Poveiros, Porto',
        title: 'Flat in rua de Passos Manuel',
        type: 'rent',
        propertyType: 'flat',
        rooms: 0,
    },
    {
        id: 765,
        price: 1400,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'beco do Forno do Castelo',
        latitude: 38.7147132,
        longitude: -9.1331245,
        province: 'Lisboa',
        subtitle: 'Santa Maria Maior, Lisboa',
        title: 'Flat in beco do Forno do Castelo',
        type: 'rent',
        propertyType: 'garage',
        rooms: 0,
    },
    {
        id: 766,
        price: 1395,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'praça Monsenhor Elisío Fernandes Araújo',
        latitude: 41.5527193,
        longitude: -8.3979387,
        province: 'Braga',
        subtitle: 'Nogueiró e Tenões, Braga',
        title: 'Flat in praça Monsenhor Elisío Fernandes Araújo',
        type: 'rent',
        propertyType: 'duplex',
        rooms: 3,
    },
    {
        id: 767,
        price: 1300,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Conde de Ferreira',
        latitude: 41.1479237,
        longitude: -8.5976839,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in rua do Conde de Ferreira',
        type: 'rent',
        propertyType: 'office',
        rooms: 4,
    },
    {
        id: 768,
        price: 1200,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Cândido dos Reis',
        latitude: 41.1475024,
        longitude: -8.6153831,
        province: 'Porto',
        subtitle: 'Aliados - Clérigos - Carlos Alberto, Porto',
        title: 'Flat in rua de Cândido dos Reis',
        type: 'rent',
        propertyType: 'flat',
        rooms: 2,
    },
    {
        id: 769,
        price: 1250,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Sobreiro',
        latitude: 41.1911103,
        longitude: -8.6525953,
        province: 'Porto',
        subtitle: 'São Mamede de Infesta e Senhora da Hora, Matosinhos',
        title: 'Flat in rua do Sobreiro',
        type: 'rent',
        propertyType: 'duplex',
        rooms: 3,
    },
    {
        id: 770,
        price: 1200,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'avenida Fernão de Magalhães',
        latitude: 40.2125772,
        longitude: -8.4315529,
        province: 'Coimbra',
        subtitle: 'Cidade de Coimbra, Coimbra',
        title: 'Flat in avenida Fernão de Magalhães',
        type: 'rent',
        propertyType: 'garage',
        rooms: 1,
    },
    {
        id: 771,
        price: 1200,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Conde de Ferreira',
        latitude: 41.1471229,
        longitude: -8.5948755,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in rua do Conde de Ferreira',
        type: 'rent',
        propertyType: 'chalet',
        rooms: 0,
    },
    {
        id: 772,
        price: 1200,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Conde de Ferreira',
        latitude: 41.1481078,
        longitude: -8.5952375,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in rua do Conde de Ferreira',
        type: 'rent',
        propertyType: 'studio',
        rooms: 2,
    },
    {
        id: 773,
        price: 1200,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Duque da Terceira',
        latitude: 41.1455297,
        longitude: -8.5968135,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in rua do Duque da Terceira',
        type: 'rent',
        propertyType: 'duplex',
        rooms: 3,
    },
    {
        id: 774,
        price: 1190,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Heroísmo',
        latitude: 41.1462401,
        longitude: -8.5921698,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in rua do Heroísmo',
        type: 'rent',
        propertyType: 'chalet',
        rooms: 3,
    },
    {
        id: 775,
        price: 1100,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Antero de Quental',
        latitude: 41.1632834,
        longitude: -8.6120847,
        province: 'Porto',
        subtitle: 'Cedofeita - Santo Ildefonso - Sé - Miragaia - São Nicolau - Vitória, Porto',
        title: 'Flat in rua de Antero de Quental',
        type: 'rent',
        propertyType: 'flat',
        rooms: 4,
    },
    {
        id: 776,
        price: 1000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Calçada do Duque',
        latitude: 38.7122415,
        longitude: -9.1439053,
        province: 'Lisboa',
        subtitle: 'Santa Maria Maior, Lisboa',
        title: 'Flat in Calçada do Duque',
        type: 'rent',
        propertyType: 'office',
        rooms: 3,
    },
    {
        id: 777,
        price: 1000,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'Alto Pina',
        latitude: 38.7455988,
        longitude: -9.1316455,
        province: 'Lisboa',
        subtitle: 'Areeiro, Lisboa',
        title: 'T0 in Alto Pina',
        type: 'rent',
        propertyType: 'room',
        rooms: 0,
    },
    {
        id: 778,
        price: 995,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua da Torrinha',
        latitude: 41.1540166,
        longitude: -8.6198022,
        province: 'Porto',
        subtitle: 'Cedofeita, Porto',
        title: 'Flat in rua da Torrinha',
        type: 'rent',
        propertyType: 'countryHouse',
        rooms: 4,
    },
    {
        id: 779,
        price: 950,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua de Caires',
        latitude: 41.5492222,
        longitude: -8.4326125,
        province: 'Braga',
        subtitle: 'Maximinos - Sé - Cividade, Braga',
        title: 'Flat in rua de Caires',
        type: 'rent',
        propertyType: 'garage',
        rooms: 4,
    },
    {
        id: 780,
        price: 950,
        createdAt: '2025-06-30T23:33:00.804Z',
        updatedAt: '2025-06-30T23:33:00.804Z',
        address: 'rua do Conde de Ferreira',
        latitude: 41.1472654,
        longitude: -8.5977634,
        province: 'Porto',
        subtitle: 'Bonfim, Porto',
        title: 'Flat in rua do Conde de Ferreira',
        type: 'rent',
        propertyType: 'duplex',
        rooms: 3,
    },
];

export default function BenchmarkingView() {
    const provinces = useMemo(() => Array.from(new Set(data.map((p) => p.province))), []);
    const [selectedProvince, setSelectedProvince] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedRooms, setSelectedRooms] = useState<string>('all');
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
    const [selectedUserPropertyId, setSelectedUserPropertyId] = useState<string>('all');

    const { data: myPropertiesData } = useMyPropertiesViewModel();
    const userProperties = myPropertiesData?.results || [];
    const selectedUserProperty = useMemo(
        () => userProperties.find((p) => String(p.id) === selectedUserPropertyId),
        [userProperties, selectedUserPropertyId],
    );

    const filteredData = useMemo(() => {
        let result = data;
        if (selectedProvince && selectedProvince !== 'all') {
            result = result.filter((p) => p.province === selectedProvince);
        }
        if (selectedType && selectedType !== 'all') {
            result = result.filter((p) => p.type === selectedType);
        }
        if (selectedRooms && selectedRooms !== 'all') {
            result = result.filter((p) => String(p.rooms) === selectedRooms);
        }
        if (selectedPropertyType && selectedPropertyType !== 'all') {
            result = result.filter((p) => p.propertyType === selectedPropertyType);
        }
        return result;
    }, [selectedProvince, selectedType, selectedRooms, selectedPropertyType]);

    const benchmarkingMetricsResult = useMemo(() => {
        if (!selectedUserProperty) return null;
        const comparable = filteredData;
        let avg = 0,
            min = 0,
            max = 0,
            position = 'N/A';
        if (comparable.length > 0) {
            avg = comparable.reduce((sum, p) => sum + p.price, 0) / comparable.length;
            min = Math.min(...comparable.map((p) => p.price));
            max = Math.max(...comparable.map((p) => p.price));
            const diff = selectedUserProperty.price - avg;
            position = 'in line with market';
            if (diff > avg * 0.05) position = 'above market';
            else if (diff < -avg * 0.05) position = 'below market';
        }
        return {
            propertyPrice: selectedUserProperty.price,
            avg,
            min,
            max,
            position,
        };
    }, [selectedUserProperty, filteredData]);

    const metrics = useMemo(() => {
        if (!filteredData || filteredData.length === 0) return { sales: [], rental: [], general: [] };

        const saleProperties = filteredData.filter((p) => p.type === 'sale');
        const rentProperties = filteredData.filter((p) => p.type === 'rent');

        const avgSalePrice =
            saleProperties.length > 0 ? saleProperties.reduce((sum, p) => sum + p.price, 0) / saleProperties.length : 0;

        const avgRentPrice =
            rentProperties.length > 0 ? rentProperties.reduce((sum, p) => sum + p.price, 0) / rentProperties.length : 0;

        const salePriceRange =
            saleProperties.length > 0
                ? {
                      min: Math.min(...saleProperties.map((p) => p.price)),
                      max: Math.max(...saleProperties.map((p) => p.price)),
                  }
                : { min: 0, max: 0 };

        const rentPriceRange =
            rentProperties.length > 0
                ? {
                      min: Math.min(...rentProperties.map((p) => p.price)),
                      max: Math.max(...rentProperties.map((p) => p.price)),
                  }
                : { min: 0, max: 0 };

        const propertiesByProvince = filteredData.reduce(
            (acc, p) => {
                acc[p.province] = (acc[p.province] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        const mostPopularProvince = Object.entries(propertiesByProvince).sort(([, a], [, b]) => b - a)[0];

        return {
            sales: [
                {
                    label: 'Average Sale Price',
                    value: (avgSalePrice * 0.7).toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                    subtitle: `${saleProperties.length} properties`,
                },
                {
                    label: 'Sale Price Range',
                    value: `${(salePriceRange.min * 0.7).toLocaleString('en-US', { style: 'currency', currency: 'EUR' })} - ${(salePriceRange.max * 0.7).toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}`,
                    subtitle: 'Min - Max',
                },
                {
                    label: 'Total Sales',
                    value: saleProperties.length.toString(),
                    subtitle: 'Properties for sale',
                },
            ],
            rental: [
                {
                    label: 'Average Monthly Rent',
                    value: avgRentPrice.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                    subtitle: `${rentProperties.length} properties`,
                },
                {
                    label: 'Rent Price Range',
                    value: `${rentPriceRange.min.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })} - ${rentPriceRange.max.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}`,
                    subtitle: 'Min - Max',
                },
                {
                    label: 'Total Rentals',
                    value: rentProperties.length.toString(),
                    subtitle: 'Properties for rent',
                },
            ],
            general: [
                {
                    label: 'Most Popular Province',
                    value: mostPopularProvince ? mostPopularProvince[0] : 'N/A',
                    subtitle: `${mostPopularProvince ? mostPopularProvince[1] : 0} properties`,
                },
                {
                    label: 'Total Properties',
                    value: filteredData.length.toString(),
                    subtitle: 'In market',
                },
            ],
        };
    }, [filteredData]);

    const mapCenter = useMemo(() => {
        if (!filteredData.length) return undefined;
        if (!selectedProvince || selectedProvince === 'all') return undefined;
        const avgLat = filteredData.reduce((sum, p) => sum + p.latitude, 0) / filteredData.length;
        const avgLng = filteredData.reduce((sum, p) => sum + p.longitude, 0) / filteredData.length;
        return [avgLat, avgLng] as [number, number];
    }, [filteredData, selectedProvince]);

    const propertyTypes = useMemo(() => ['flat', 'chalet', 'countryHouse', 'garage', 'premise', 'room', 'office'], []);

    const roomOptions = useMemo(
        () => [
            { label: 'T0', value: '0' },
            { label: 'T1', value: '1' },
            { label: 'T2', value: '2' },
            { label: 'T3', value: '3' },
            { label: 'T4', value: '4' },
        ],
        [],
    );

    // Debug logs
    console.log('userProperties', userProperties);
    console.log('selectedUserPropertyId', selectedUserPropertyId);
    console.log('selectedUserProperty', selectedUserProperty);
    console.log('filteredData', filteredData);
    console.log('benchmarkingMetricsResult', benchmarkingMetricsResult);

    return (
        <div className="h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex-shrink-0">
                <ModuleTitle title="Benchmarking" subtitle="Compare your property with similar ones" />
                <div className="mt-2 text-xs text-muted-foreground">
                    Last updated:{' '}
                    {filteredData.length > 0
                        ? new Date(filteredData[0].createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                          })
                        : 'N/A'}
                </div>
                <div className="mb-4 mt-4 flex gap-4 flex-wrap">
                    <div>
                        <Label htmlFor="province-select" className="mr-2">
                            Filter by province:
                        </Label>
                        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                            <SelectTrigger id="province-select" className="w-56">
                                <SelectValue placeholder="All provinces" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All provinces</SelectItem>
                                {provinces.map((province) => (
                                    <SelectItem key={province} value={province}>
                                        {province}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="type-select" className="mr-2">
                            Filter by operation:
                        </Label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger id="type-select" className="w-40">
                                <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All types</SelectItem>
                                <SelectItem value="sale">Sale</SelectItem>
                                <SelectItem value="rent">Rental</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="rooms-select" className="mr-2">
                            Tipology:
                        </Label>
                        <Select value={selectedRooms} onValueChange={setSelectedRooms}>
                            <SelectTrigger id="rooms-select" className="w-32">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {roomOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="property-type-select" className="mr-2">
                            Property type:
                        </Label>
                        <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                            <SelectTrigger id="property-type-select" className="w-48">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {propertyTypes.map((type) => {
                                    // Transform camelCase to normal (e.g., 'countryHouse' -> 'Country House')
                                    const label = type
                                        .replace(/([A-Z])/g, ' $1')
                                        .replace(/^./, (str) => str.toUpperCase());
                                    return (
                                        <SelectItem key={type} value={type}>
                                            {label}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    {(selectedProvince !== 'all' ||
                        selectedType !== 'all' ||
                        selectedRooms !== 'all' ||
                        selectedPropertyType !== 'all') && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs underline text-muted-foreground hover:text-foreground transition-colors px-2 py-1 ml-2 mt-6"
                            onClick={() => {
                                setSelectedProvince('all');
                                setSelectedType('all');
                                setSelectedRooms('all');
                                setSelectedPropertyType('all');
                            }}
                        >
                            Clear filters
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-5 w-1 bg-green-500 rounded-full"></div>
                            <h2 className="text-base font-bold text-foreground">SALES OPERATIONS</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {metrics.sales.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        {metric.label}
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">{metric.value}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {metric.subtitle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
                            <h2 className="text-base font-bold text-foreground">RENTAL OPERATIONS</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {metrics.rental.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        {metric.label}
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">{metric.value}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {metric.subtitle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-5 w-1 bg-purple-500 rounded-full"></div>
                            <h2 className="text-base font-bold text-foreground">GENERAL MARKET</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {metrics.general.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        {metric.label}
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">{metric.value}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {metric.subtitle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-5 w-1 bg-pink-500 rounded-full"></div>
                            <h2 className="text-base font-bold text-foreground">YOUR PROPERTY BENCHMARKING</h2>
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="user-property-select" className="mr-2">
                                Select your property:
                            </Label>
                            <Select value={selectedUserPropertyId} onValueChange={setSelectedUserPropertyId}>
                                <SelectTrigger id="user-property-select" className="w-80">
                                    <SelectValue placeholder="Select a property" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Select a property</SelectItem>
                                    {userProperties.map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>
                                            {p.name} ({p.localization})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedUserProperty && benchmarkingMetricsResult ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        Your property price
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">
                                        {Number.isFinite(benchmarkingMetricsResult.propertyPrice)
                                            ? benchmarkingMetricsResult.propertyPrice.toLocaleString('en-US', {
                                                  style: 'currency',
                                                  currency: 'EUR',
                                              })
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        Market average
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">
                                        {Number.isFinite(benchmarkingMetricsResult.avg)
                                            ? benchmarkingMetricsResult.avg.toLocaleString('en-US', {
                                                  style: 'currency',
                                                  currency: 'EUR',
                                              })
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        Price range
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">
                                        {Number.isFinite(benchmarkingMetricsResult.min)
                                            ? benchmarkingMetricsResult.min.toLocaleString('en-US', {
                                                  style: 'currency',
                                                  currency: 'EUR',
                                              })
                                            : 'N/A'}{' '}
                                        -{' '}
                                        {Number.isFinite(benchmarkingMetricsResult.max)
                                            ? benchmarkingMetricsResult.max.toLocaleString('en-US', {
                                                  style: 'currency',
                                                  currency: 'EUR',
                                              })
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                                        Market position
                                    </span>
                                    <span className="text-sm font-bold text-foreground mt-1">
                                        {benchmarkingMetricsResult.position}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-xs text-muted-foreground mt-2">
                                Select a property to see the benchmarking.
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 h-full min-h-0">
                    <Map points={filteredData || []} center={mapCenter} />
                </div>
            </div>
        </div>
    );
}
