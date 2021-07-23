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
        creneau* edt;
        char* nom_fichier = NULL;
        nom_edt = afficher_repertoire("edt");
        printf("\n vous avez choisi : %s\n", nom_edt);

        if(OS == 2){
            nom_fichier = concatener("edt\\",nom_edt);
        } else{
            nom_fichier = concatener("edt/",nom_edt);
        }
        printf("\n le fichier s'appelle : %s\n", nom_fichier);
        edt = readFile(nom_fichier);

        printf("cours : %s\n",edt[0].nom_matiere);
        printf("heure début : %s\n",edt[0].heure_debut);
        printf("heure fin : %s\n",edt[0].heure_fin);
        printf("jour de la semaine : %s\n",edt[0].jour_semaine);
        printf("salle(s) : %s\n",edt[0].salles);
        printf("%d\n",edt[0].frequence);

        printf("%d\n",edt[1].frequence);
        printf("%d\n",edt[2].frequence);
        printf("%d\n",edt[3].frequence);
        printf("%d\n",edt[4].frequence);
        free(edt);
        free(nom_fichier);
        free(nom_edt);
    }
    return EXIT_SUCCESS;
}