import kfp.components as comp


class Component(object):
    """
    Class that represents a set up component in a workflow.
    """

    def __init__(self, comp_file: str, name: str, dependencies: list = None, input: list = None, output = None, parameters = None) -> None:
        """
        Parameters:
        ===========

        `comp_file`: str
            The filename of the component.yaml where the component is described.

        `dependencies`: list
            The dependencies for the current component, that define which components should be completed before the current component.
            This dependencies should be extracted both based on the dependencies of the set_up components and on the dependencies defined by the user.
        `input`: list
            The expected input of the component.
        `output`: list
            The expected output of the component.
        `parameters`: list
        """
        
        self.comp_func = comp.load_component_from_file(comp_file)


        self.name = name
        self.dependencies = dependencies
        self.input = input
        self.output = output
        self.parameters = parameters




    def getName(self):
        return self.name
    
    def getCompFunc(self):
        return self.comp_func
    
    def getDependencies(self):
        return self.dependencies
    
    def getInput(self):
        return self.input
    
    def getOutput(self):
        return self.output
    
    def getParameters(self):
        return self.parameters
    
 