#ifndef CALENDAR_HEADER
#define CALENDAR_HEADER

#include <stdlib.h>
#include <stdio.h>
#include <time.h>
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
    char* heure_fin; /** \brief heure_fin : heure dde fin du cours */
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
 * \fn time_t getTime()
 * \brief fonction permettant d'afficher l'heure actuelle
 * \return l'heure sous une variable time_t, utilisée par la librairie time.h
 */
time_t getTime();




#endif