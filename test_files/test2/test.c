#include <stdio.h>
#include "parser.h"
#include <string.h>
#include <stdlib.h>

FILE* create_asm_file(char* name) {
    int len = strlen(name);
    name[len - 2] = '\0';
    char* output = name;
    strcat(output, ".asm");
    printf("Output File: %s\n", output);
    FILE *output_file = fopen(output, "w");
    return output_file;
}

int main(int argc, char** argv) {
    if (argc <= 1) {
        printf("Please specify a file to compile \n");
        return 0;
    } 
    FILE *file = fopen(argv[1], "r");

    if (file == NULL) {
        printf("ERROR: NO SUCH FILE \n");
        return 0;
    }
    FILE* output_file = create_asm_file(argv[1]);
    printf("Files opened \n");
    parse(file, output_file);
    fclose(file);
    fclose(output_file);
    printf("Files closed successfully. Done \n");
}
