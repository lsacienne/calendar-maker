/**
 * \file calendar.c
 * \brief fichier c de la bibliothèque calendar
 * 
 * \author Alexandre "L'Sacienne" V. 
 * \version 1.0
 * \date février 2021
 */

#include "calendar.h"

creneau initCours(){
    creneau c;
    c.nom_matiere = NULL;
    c.type_cours = NULL;
    c.jour_semaine = NULL;
    c.heure_debut = NULL;
    c.heure_fin = NULL;
    c.frequence = 1;
    c.mode_cours = NULL;
    c.salles = NULL;
    return c;
}



int menu(char* titre_menu, char** tableau_proposition){
    if(tableau_proposition[0] != NULL){
        int i;
        char buffer[100];
        int reponse = -1;
        do{
            i=0;
            printf("\n%s\n", titre_menu);
            while(tableau_proposition[i] != NULL){
                printf("\n%d : %s", i,  tableau_proposition[i]);
                i++;
            }
            printf("\n\n Votre reponse :\t");
            scanf("%s", buffer);
        } while((sscanf(buffer,"%d",&reponse)==EOF)||(reponse > i-1)||(reponse <0));
        return reponse;
    }
    return -1;
}

char* afficher_repertoire(char* repertoire){
    int index_fichier = -1;
    struct dirent *dir;
    int iteration = 0;
    char** tableau_fichiers = NULL;
    char* buffer_fichier;
    // opendir() renvoie un pointeur de type DIR. 
    DIR *d = opendir(repertoire);
    if (d != NULL){
        while ((dir = readdir(d)) != NULL){
            buffer_fichier =(char*) malloc(sizeof(char)*strlen(dir->d_name));
            buffer_fichier = strcpy(buffer_fichier, dir->d_name);
            if(tableau_fichiers == NULL){
                tableau_fichiers = (char**) malloc(sizeof(char*));
            } else{
                tableau_fichiers = realloc(tableau_fichiers, sizeof(char*)*(iteration+1));
            }
            tableau_fichiers[iteration] = (char*) malloc(sizeof(char)*strlen(buffer_fichier));
            tableau_fichiers[iteration] = strcpy(tableau_fichiers[iteration],buffer_fichier);
            iteration++;
            free(buffer_fichier);
        }
        closedir(d);
        tableau_fichiers[iteration] = NULL;
        index_fichier = menu("Quel fichier voulez-vous choisir ?", tableau_fichiers);
        return tableau_fichiers[index_fichier];    
    }
    return NULL;
}

creneau* readFile(char* file_name){
    FILE* f = fopen(file_name,"r");
    int i = 0;
    creneau* liste_cours = NULL;
    char* ligne = (char*) malloc(sizeof(char)*80);
    char* strToken;

    

    while(fgets(ligne,80,f) != NULL){
        if(i==0){
            liste_cours = (creneau*) malloc(sizeof(creneau));
        } else{
            liste_cours = (creneau*) realloc(liste_cours,sizeof(creneau)*(i+1));
        }
        liste_cours[i] = initCours();

        liste_cours[i].nom_matiere = (char*) malloc(sizeof(char)*6);
        liste_cours[i].type_cours = (char*) malloc(sizeof(char)*6);
        liste_cours[i].jour_semaine = (char*) malloc(sizeof(char)*10);
        liste_cours[i].heure_debut = (char*) malloc(sizeof(char)*7);
        liste_cours[i].heure_fin = (char*) malloc(sizeof(char)*7);
        liste_cours[i].frequence = 0;
        liste_cours[i].mode_cours = (char*) malloc(sizeof(char)*12);
        liste_cours[i].salles = (char*) malloc(sizeof(char)*21);
        
        strToken = strtok(ligne,"\t");
        liste_cours[i].nom_matiere = strcpy(liste_cours[i].nom_matiere,strToken);

        strToken = strtok(NULL,"\t");
        liste_cours[i].type_cours = strcpy(liste_cours[i].type_cours,strToken);

        strToken = strtok(NULL,"\t");
        liste_cours[i].jour_semaine = strcpy(liste_cours[i].jour_semaine,strToken);

        strToken = strtok(NULL,"\t");
        liste_cours[i].heure_debut = strcpy(liste_cours[i].heure_debut,strToken);

        strToken = strtok(NULL,"\t");
        liste_cours[i].heure_fin = strcpy(liste_cours[i].heure_fin,strToken);

        strToken = strtok(NULL,"\t");
        liste_cours[i].frequence = atoi(strToken);

        strToken = strtok(NULL,"\t");
        liste_cours[i].mode_cours = strcpy(liste_cours[i].mode_cours,strToken);
        
        if(strcmp(strToken,"")!=0){
            strToken = strtok(NULL,"\t");
            liste_cours[i].salles = strcpy(liste_cours[i].salles,strToken);
        } else{
            liste_cours[i].salles = NULL;
        }

        free(strToken);
        i++;
    }
    fclose(f);
    free(f);
    free(file_name);

    return liste_cours;
}

time_t getTime(){
    time_t t;
    return time(&t);
}

char* concatener(char* string_1,char* string_2){
    int longeur = strlen(string_1) + strlen(string_2) + 10;
    char* string_result = (char*) malloc(sizeof(char)*longeur);
    string_result = strcpy(string_result,string_1);
    string_result = strcat(string_result,string_2);
    return string_result;
}
