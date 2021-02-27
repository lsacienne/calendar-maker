/**
 * \file calendar.h
 * \brief header file de la bibliothèque calendar.c
 * 
 * \author Alexandre "L'Sacienne" V. 
 * \version 1.0
 * \date février 2021
 */

#ifndef CALENDAR_HEADER
#define CALENDAR_HEADER

#ifdef __unix__ 

    #define OS 1

#elif _WIN32 
    
    #define OS 2

#elif __posix__
    
    #define OS 3

#elif __linux__
    
    #define OS 4

#elif __APPLE__
    
    #define OS 5

#endif

#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include <string.h>
#include <dirent.h>

/**
 * \struct creneau
 * \brief une structure pour stocker les données des créneux horaires pour chaque cours
 */
typedef struct{
    char* nom_matiere; /** \brief nom_matiere : nom de la matière */
    char* type_cours; /** \brief type_cours : le type du cours ( CM, TD, TP) */
    char* jour_semaine; /** \brief jour_semaine : le jour dans la semaine */
    char* heure_debut; /** \brief heure_debut : heure du début du cours */
    char* heure_fin; /** \brief heure_fin : heure de fin du cours */
    int frequence; /** \brief frequence : frequence du cours ( 1 : toutes les semaines; 2 : 1 semaine sur deux) */
    char* mode_cours; /** \brief mode_cours : mode du cours pendant l'épidémie du Covid-19*/
    char* salles; /** \brief salles : nom de la salle du cours ( s'il y en a une) */
} creneau;



/**
 * \fn creneau initCours()
 * \brief initialiser à NULL un cours d'une matière
 * \return une structure creneau avec des champs par défaut
 */
creneau initCours();

/**
 * \fn creneau fillCours(creneau c,char* nom_matiere,char* type_cours, char* jour_semaine, char* heure_debut, char* heure_fin, int frequence, char* mode_cours, char* salle)
 * \brief une fonction permattant de remplir un cours avec les informations qu'il contient
 * \param nom_matiere - nom de la matière
 * \param type_cours - chaîne de caractères, le type du cours ( CM, TD, TP)
 * \param jour_semaine - chaîne de caractères, le jour dans la semaine
 * \param heure_debut - chaîne de caractères, heure du début du cours
 * \param heure_fin - chaîne de caractères, heure de fin du cours
 * \param frequence - entier, frequence du cours ( 1 : toutes les semaines; 2 : 1 semaine sur deux)
 * \param mode_cours - chaîne de caractères, mode du cours pendant l'épidémie du Covid-19
 * \param salles - chaîne de caractères, nom de la salle du cours ( s'il y en a une)
 * \return un creneau complété avec les données rentrées
 */
creneau fillCours(creneau c,char* nom_matiere,char* type_cours, char* jour_semaine, char* heure_debut, char* heure_fin, int frequence, char* mode_cours, char* salle);

/** 
 * \fn int menu(char* titre_menu, char** tableau_proposition)
 * \brief Fonction permettant d'afficher un menu
 * \param titre_menu - une chaîne de caractères correspondant au titre du menu
 * \param tableau_proposition - un tableau de chaîne de caractère correspondant aux différentes propostions possibles d'effectuer
 * \return un entier - l'index de la proposition que l'utilisateur a choisi. S'il est égal à -1 c'est qu'il n'y avait pas de propositions.
 */
int menu(char* titre_menu, char** tableau_proposition);


/**
 * \fn char* afficher_repertoire()
 * \brief fonction permettant d'afficher le contenu d'un répertoire
 * \param repertoire - une chaîne de caractères représentant le nom du fichier courant
 * \return une chaîne de caractères, le nom du fichier choisi par l'utilisateur
 */
char* afficher_repertoire(char* repertoire);

/**
 * \fn creneau* readFile(char* file_name)
 * \brief une fonction permettant de lire le fichier avec l'emploi du temps au format de l'utbm
 * \param file_name - une chaîne de caractères avec le nom du fichier avec le bon dossier
 * \return un tableau de creneaux - tous les creneaux de l'emploi du temps dasn le fichier
 */
creneau* readFile(char* file_name);

/**
 * \fn time_t getTime()
 * \brief fonction permettant d'afficher l'heure actuelle
 * \return l'heure sous une variable time_t, utilisée par la librairie time.h
 */
time_t getTime();

/**
 * \fn char* concatener(char* string_1,char* string_2)
 * \brief fonction permettant de concaténer deux strings en un seul peu importe l'ordre
 * \param string_1 - chaîne de caractère correspondant au string en première position
 * \param string_2 - chaîne de caractère correspondant au string en deuxième condition
 * \return une chaîne de caractères correspondant à la concaténation
 */
char* concatener(char* string_1,char* string_2);



#endif