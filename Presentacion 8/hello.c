/*
Archivo: [nombre_modulo].c
*/

// Librerías a cargar
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

MODULE_LICENSE("MODULO");
MODULE_AUTHOR("AUTOR");
MODULE_DESCRIPTION("DESCRIPCION");
MODULE_VERSION("VERSION");

// Definicion de evento principal
static int __init event_init (void) {

    // Codigo dentro del evento INIT
    printk(KERN_INFO "Hello world.\n");
    // Retornar 0 si todo está bien
    // Retornar [num] como código de error
    return 0;
}

static void __exit event_exit(void) {

    printk(KERN_INFO "GoodBye World.\n");
    // Código dentro del evento EXIT
}

// esta llamada carga la función que se ejecutará en el init
module_init(event_init);

// esta llamada carga la función que se ejecutará en el exit
module_exit(event_exit);