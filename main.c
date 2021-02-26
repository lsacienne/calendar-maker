/**
 * \file main.c
 * \brief fichier main du projet de générateur d'emplois du temps sous forme de .ics. 
 * 
 * \author Alexandre "L'Sacienne" V. 
 * \version 1.0
 * \date février 2021
 */

#include "calendar.h"

int main( int argc, char* argv[]){
    char* nom_edt = NULL;
    char** liste_options_1 = (char**) malloc(sizeof(char*)*2);
    liste_options_1[0] = "Generer mon emploi du temps";
    liste_options_1[1] = "Quitter";
    liste_options_1[2] = NULL;
    if(menu("Que voulez-vous faire ?",liste_options_1)==0){
        nom_edt = afficher_repertoire("edt");
        printf("\n vous avez choisi : %s", nom_edt);
    }
    return EXIT_SUCCESS;
}